<script lang="ts">
    import p5 from "p5";
    import { onMount } from "svelte";

    export let style: string = "";

    export let funcs: (p: p5) => any = (p) => {};

    const sketch = (p: p5) => {
        let funcRet = funcs(p);

        if (funcRet.setup != null)
            p.setup = () => {
                if (funcRet.setup != null) {
                    funcRet.setup();
                }
            };

        p.preload = () => {
            if (funcRet.preload != null) {
                funcRet.preload();
            }
        };

        p.draw = () => {
            p.resizeCanvas(p5div.offsetWidth, p5div.offsetHeight);
            if (funcRet.draw != null) {
                funcRet.draw();
            }
        };
    };

    let p5div: HTMLDivElement;

    onMount(() => {
        new p5(sketch, p5div);
    });
</script>

<div class="p5div" {style} bind:this={p5div}>
    <div class="child_slot">
        <slot />
    </div>
</div>

<style>
    .p5div {
        overflow: hidden;
    }
    .child_slot {
        position: absolute;
    }
    :global(.p5div > *) {
        display: block;
    }
</style>
