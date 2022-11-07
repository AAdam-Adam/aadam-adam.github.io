<script lang="ts">
    import { vec2, Vector2 } from "./vector2";
    import { tweened } from "svelte/motion";
    import { cubicInOut, sineIn } from "svelte/easing";
    import { onMount } from "svelte";
    import P5 from "./P5.svelte";
    import { compute_slots } from "svelte/internal";

    // angle math

    let alpha = 1;
    const alphaRad = () => (Math.PI / 180) * alpha;

    let beta = 1;
    const betaRad = () => (Math.PI / 180) * beta;

    let thetaR = 1;

    let r = 100;

    const x = () => r * Math.sin(alphaRad());
    console.log(x);
    const y = () => r * Math.sin(betaRad());
    console.log(y);

    const R = () => Math.sqrt(x() ** 2 + y() ** 2);

    const theta0 = () => Math.atan2(y(), x());
</script>

<!-- sliders for the gyro angles; yaw, pitch and roll respectively -->
<input type="range" min="-90" max="90" bind:value={alpha} />

<input type="range" min="-90" max="90" bind:value={beta} />

<input type="range" min="-180" max="180" bind:value={thetaR} />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<h1 style:display="inline-block">🗿🗿🗿🗿🗿🗿🗿🗿🗿🗿🗿🗿</h1>

<P5
    funcs={(p) => {
        // this part does the gyro instrument
        return {
            setup: () => {
                p.ellipseMode(p.RADIUS);
                p.smooth();
            },
            draw: () => {
                p.background(0);

                p.translate(p.width / 2, p.height / 2);

                p.scale(1, -1);

                p.stroke(255);
                p.strokeWeight(2);

                p.circle(0, 0, 100);

                p.stroke(0);
                p.strokeWeight(2);

                p.rotate((-thetaR * Math.PI) / 180);
                p.line(
                    0,
                    0,
                    R() * Math.cos(theta0()),
                    R() * Math.sin(theta0())
                );
                console.log(alphaRad);
            },
        };
    }}
    style="
    position: absolute;
    width: 400px;
    height: 400px;
    bottom: 0px;
    left: 0px;
    border-radius: 16px;
    border: 4px solid yellow;
"
/>

<P5
    funcs={(p) => {
        let img;
        // this part of the code does the map instrument. much to be upgraded
        let pathGPS = [];
        for (let i = 0; i < 1000; i++) {
            pathGPS.push(
                vec2(
                    i * Math.cos(0.5636) + 2 * Math.random(),
                    8 * Math.log(i) + 2 * Math.random()
                )
            );
        }

        let path2 = [];
        for (let i = 0; i < 1000; i++) {
            path2.push(
                vec2(
                    i * Math.cos(0.5636) + 5 * Math.random(),
                    8 * Math.log(i) + 5 * Math.random()
                )
            );
        }

        let posIndex = 0;

        return {
            preload: () => {
                img = p.loadImage("test.PNG");
            },
            setup: () => {
                p.ellipseMode(p.RADIUS);
                p.smooth();
            },
            draw: () => {
                p.background(0);

                p.image(img, 0, 0);
                p.translate(p.width / 2, p.height / 2);

                p.scale(1, -1);

                p.strokeWeight(2);

                posIndex += 1;
                p.stroke(255, 0, 0);
                p.circle(-80, 60, 5);

                p.stroke(255);
                for (let pos of pathGPS) {
                    p.circle(pos.x, pos.y, 0.2);
                }

                p.circle(pathGPS[posIndex].x, pathGPS[posIndex].y, 5);

                p.stroke(127, 0, 255);
                for (let pos of path2) {
                    p.circle(pos.x, pos.y, 0.2);
                }

                p.circle(path2[posIndex].x, path2[posIndex].y, 5);
            },
        };
    }}
    style="
    position: absolute;
    width: 400px;
    height: 400px;
    bottom: 0px;
    left: 650px;
    border-radius: 16px;
    border: 4px solid yellow;
"
/>

<P5
    funcs={(p) => {
        let altitude = 0;
        // this part of the code does the altitude instrument
        return {
            setup: () => {
                p.ellipseMode(p.RADIUS);
                p.smooth();
            },
            draw: () => {
                altitude += 1;

                p.background(0);

                p.translate(p.width / 2, p.height / 2);

                p.scale(1, -1);

                p.stroke(255);
                p.strokeWeight(2);
                p.line(-150, altitude - 400, 300, altitude - 400);
                p.fill(255);
                p.scale(1, -1);
                p.noStroke();
                p.text(altitude * 10 + "m", 100, 395 - altitude);
            },
        };
    }}
    style="
    position: absolute;
    width: 300px;
    height: 800px;
    bottom: 0px;
    right: 0px;
    border-radius: 16px;
    border: 4px solid yellow;
"
/>
