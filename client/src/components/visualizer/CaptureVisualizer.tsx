import React, {useEffect, useLayoutEffect, useRef, useState} from "react"

import {Canvas} from "../../App"

interface RecordVisualizerProps {
    status: string
    stream: MediaStream | null
}

function Component({status, stream}: RecordVisualizerProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const FREQUENCY_BIN_COUNT = 1024

        let animationFrame: number

        let canvas = canvasRef.current!
        let ctx = canvas.getContext("2d")!

        let cw = window.innerWidth * 0.76
        let ch = window.innerHeight * 0.32

        canvas.width = cw
        canvas.height = ch

        class Circle {
            index: number
            x: number
            y: number
            r: number

            constructor(index: number, x: number, y: number, r: number) {
                this.index = index
                this.x = x
                this.y = y
                this.r = r
            }

            draw() {
                ctx.save()
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
                ctx.fillStyle = "rgba(0,0,0,1)"
                ctx.fill()
                ctx.restore()
            }

            update(y: number) {
                this.y = y
            }
        }

        let circles: Circle[] = []

        for (let i = 0; i < FREQUENCY_BIN_COUNT; i += 16) {
            let rX = (Math.random() * 4 - 2)
            let rR = (Math.random() * 3 + 1)
            let x = cw / 6 + rX + (i * (4 / 6) * (cw / FREQUENCY_BIN_COUNT))
            let y = ch / 2
            let r = rR
            circles.push(new Circle(i, x, y, r))
        }

        if (status === "recording") {
            let audioContext = new AudioContext()
            let analyser = audioContext.createAnalyser()
            let dataArray = new Uint8Array(analyser.frequencyBinCount)

            let source = audioContext.createMediaStreamSource(stream!)
            source.connect(analyser)

            function draw() {
                animationFrame = requestAnimationFrame(draw)

                ctx.clearRect(0, 0, cw, ch)

                analyser.getByteTimeDomainData(dataArray)

                circles.forEach((circle, i) => {
                    let v = dataArray[circle.index] / 128.0
                    let y = v * ch / 2
                    circle.update(y)
                    circle.draw()
                })
            }

            animationFrame = requestAnimationFrame(draw)

            return () => {
                cancelAnimationFrame(animationFrame)
            }
        }
    }, [stream])

    return (
        <Canvas width="calc(100% - 256px)" id="canvas" ref={canvasRef}/>
    )
}

export default Component