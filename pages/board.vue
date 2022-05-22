<template>

    <div>
        <div id="draw">
            <modal name="example" :adaptive="true" :draggable="true">

                <div class="bg">

                    <div style="display:flex;justify-content:space-around;flex-wrap: wrap;">
                        <li style="list-style:none">
                            <h1 class="fade-up" style="padding-top:60%;padding-left:20%">Geez</h1>
                            <h2 class="fade-up" style="padding-left:20%">
                                CSEC-ASTU
                            </h2>

                            <a href="#" target="blank" class="fade-up"
                                style="padding-left:20%;color:#ffff">@csec_astu</a>
                        </li>

                        <li style="list-style:none">
                            <p v-if="result != ''" style="padding-top:35%;font-size: 28px;"> {{
                                    (result[0][0] * 100).toFixed(2)
                            }} % Matchs to <br><span style="color:chartreuse">
                                    Number {{ result[0][1] }}
                                </span>in arabic </p>
                        </li>
                    </div>

                    <div class="share" v-if="result != ''" style="padding-left:20%">

                        <div class="fade-up" style="padding-top:20px;padding-left:30%">
                            <h2>Share</h2>
                        </div>
                        <ShareNetwork network="twitter" url="http://localhost:3000/"
                            :title="`Geez CSEC-ASTU AI results ${(result[0][0] * 100).toFixed(2)} % Accuracy `"
                            description="This week, I’d like to introduce you to 'Geex', which is 'Fast'. It’s a brand new Hand Writing Detection AI."
                            quote="The hand writing detection AI is the best thing since sliced bread."
                            hashtags="GEEZ,AI,HandWriting,Arabic,Amharic" twitterUser="youyuxi">
                            <i class="fab fah fa-lg fa-twitter"></i>
                            <span><img src="assets/twitter.png"  style="width: 35px;margin-left: 70px;margin-right:10px;margin-bottom: 10px;margin-top: 15px;" alt=""></span>
                        </ShareNetwork>

                          <ShareNetwork network="facebook" url="http://localhost:3000/"
                            :title="`Geez CSEC-ASTU AI results ${(result[0][0] * 100).toFixed(2)} % Accuracy `"
                            description="This week, I’d like to introduce you to 'Geex', which is 'Fast'. It’s a brand new Hand Writing Detection AI."
                            quote="The hand writing detection AI is the best thing since sliced bread."
                            hashtags="GEEZ,AI,HandWriting,Arabic,Amharic" twitterUser="youyuxi">
                            <i class="fab fah fa-lg fa-twitter"></i>
                            <span><img src="assets/facebook.png"  style="width: 35px;margin-left: 10px;margin-right:10px;margin-bottom: 10px;" alt=""></span>
                        </ShareNetwork>
                          <ShareNetwork network="linkedin" url="http://localhost:3000/"
                            :title="`Geez CSEC-ASTU AI results ${(result[0][0] * 100).toFixed(2)} % Accuracy `"
                            description="This week, I’d like to introduce you to 'Geex', which is 'Fast'. It’s a brand new Hand Writing Detection AI."
                            quote="The hand writing detection AI is the best thing since sliced bread."
                            hashtags="GEEZ,AI,HandWriting,Arabic,Amharic" twitterUser="youyuxi">
                            <i class="fab fah fa-lg fa-twitter"></i>
                            <span><img src="assets/linkedin(1).png"  style="width: 35px;margin-left: 10px;margin-right:10px;margin-bottom: 10px;" alt=""></span>
                        </ShareNetwork>
                          <ShareNetwork network="telegram" url="http://localhost:3000/"
                            :title="`Geez CSEC-ASTU AI results ${(result[0][0] * 100).toFixed(2)} % Accuracy `"
                            description="This week, I’d like to introduce you to 'Geex', which is 'Fast'. It’s a brand new Hand Writing Detection AI."
                            quote="The hand writing detection AI is the best thing since sliced bread."
                            hashtags="GEEZ,AI,HandWriting,Arabic,Amharic" twitterUser="youyuxi">
                            <i class="fab fah fa-lg fa-twitter"></i>
                            <span><img src="assets/telegram.png"  style="width: 35px;margin-left: 10px;margin-right:10px;margin-bottom: 10px;" alt=""></span>
                        </ShareNetwork>

                    </div>

                </div>

            </modal>
            <div class="app-wrapper">
                <canvas id="canvas" style="cursor:url(assets/feather-pen.png),auto">
                </canvas>





                <div class="cursor" id="cursor" ></div>


                <div class="controls">
                    <div class="btn-row">
                        <button type="button" alt="'Your History.'">
                            <img src="assets/history.png" alt="" style="width:35px"> <span style="color:#fff">
                                {{ history.length }}
                            </span>
                        </button>
                    </div>
                    <div class="btn-row">
                        <button type="button" v-on:click="removeHistoryItem"
                            v-bind:class="{ disabled: !history.length }" title="Undo">
                            <img src="assets/undo.png" alt="" style="width:35px">

                        </button>

                    </div>
                    <div class="btn-row">
                        <button type="button" v-on:click="removeAllHistory" v-bind:class="{ disabled: !history.length }"
                            title="Clear all">
                            <img src="assets/cleaning.png" alt="" style="width:35px">

                        </button>
                    </div>

                    <div class="btn-row">
                        <button title="Brush options" v-on:click="popups.showOptions = !popups.showOptions">
                            <img src="assets/admin.png" alt="" style="width:35px">
                        </button>

                        <div class="popup" v-if="popups.showOptions">
                            <div class="popup-title">
                                Options
                            </div>
                            <button title="Restrict movement vertical"
                                v-on:click="options.restrictY = !options.restrictY; options.restrictX = false"
                                v-bind:class="{ active: options.restrictY }">
                                <i class="ion ion-arrow-right-c"></i>
                                Restrict vertical
                            </button>
                            <button title="Restrict movement horizontal"
                                v-on:click="options.restrictX = !options.restrictX; options.restrictY = false"
                                v-bind:class="{ active: options.restrictX }">
                                <i class="ion ion-arrow-up-c"></i>
                                Restrict horizontal
                            </button>

                        </div>

                    </div>

                    <div class="btn-row">
                        <button title="Pick a brush size" v-on:click="popups.showSize = !popups.showSize"
                            v-bind:class="{ active: popups.showSize }">

                            <img src="assets/pen.png" alt="" style="width:35px"> <span style="color:#fff">
                                {{ size }}
                            </span>

                        </button>

                        <div class="popup" v-if="popups.showSize">
                            <img src="assets/pen.png" alt="">
                            <label v-for="sizeItem in sizes" class="size-item" :key="sizeItem">
                                <input type="radio" name="size" v-model="size" v-bind:value="sizeItem">
                                <span class="size" v-bind:style="{ width: sizeItem + 'px', height: sizeItem + 'px' }"
                                    v-on:click="popups.showSize = !popups.showSize"></span>
                            </label>
                        </div>
                    </div>

                    <div class="btn-row">
                        <button title="Pick a color" v-on:click="popups.showColor = !popups.showColor"
                            v-bind:class="{ active: popups.showColor }" v-bind:style="{ backgroundColor: color }"
                            style="height:55px;width:55px;padding:5px;border-radius:50%">

                            <img src="assets/colour.png" alt="" style="width:35px">


                        </button>

                        <div class="popup" v-if="popups.showColor">
                            <div class="popup-title">
                                Brush color
                            </div>

                            <label v-for="colorItem in colors" class="color-item" :key="colorItem">
                                <input type="radio" name="color" v-model="color" v-bind:value="colorItem">
                                <span v-bind:class="'color color-' + colorItem"
                                    v-bind:style="{ backgroundColor: colorItem }"
                                    v-on:click="popups.showColor = !popups.showColor"></span>
                            </label>
                        </div>
                    </div>

                    <div class="btn-row">
                        <button title="Save" v-on:click="popups.showSave = !popups.showSave">
                            <img src="assets/diskette.png" alt="" style="width:35px">
                        </button>

                        <div class="popup" v-if="popups.showSave">
                            <div class="popup-title">
                                Save your design
                            </div>
                            <div class="form">
                                <input type="text" placeholder="Save name" v-model="save.name">
                                <div v-if="save.name.length < 3" class="text-faded">
                                    <i>
                                        Min 3 characters
                                    </i>
                                </div>
                                <span class="btn" v-on:click="saveItem">
                                    Save as
                                    <span class="text-faded">
                                        {{ save.name }}
                                    </span>
                                </span>
                            </div>

                            <div class="saves" v-if="save.saveItems.length">
                                <div class="popup-title">
                                    Load a save
                                </div>

                                <div class="save-item" v-for="item in save.saveItems" :key="item">
                                    <h3>{{ item.name }}</h3>
                                    <span class="btn" v-on:click="loadSave(item)">load</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="btn-row">
                        <nuxt-link to="/">

                            <button>
                                <img src="assets/home.png" alt="" style="width:35px">

                            </button>
                        </nuxt-link>
                    </div>
                    <div class="btn-row">
                        <button v-on:click="takeshot">
                            <p v-if="processing" style="color:#fff">Processing ....</p>
                            <img v-else src="assets/process.png" alt="" style="width:35px">

                        </button>
                    </div>
                    <form @submit.prevent="Upload">

                        <input @change="SaveChanges" :v-model="image_data" type="file" placeholder="Select Image">
                        <input v-if="image_data" type="submit" value="Submit"  />
                    </form>

                    <div class="btn-row" style="height:55px;width:85px">
                        <button v-on:click="Download" style="padding:0;margin:0">
                            <p v-if="downloading" style="color:#fff;font-size:13px">Downloading ....</p>
                            <img v-else src="assets/cloud-computing.png" alt="" style="width:35px">

                        </button>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>

import html2canvas from 'html2canvas';
import axios from 'axios';

export default {
    head() {
        return {
            link: [

                { rel: 'stylesheet', href: 'styles/board.css' },
                { rel: 'stylesheet', href: 'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css' },
            ],

            script: [
                { src: "https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.min.js" }
            ]
        }

    },
    data() {

        return {



            c: "",
            ctx: "",

            mouseDown: false,
            mouseX: 0,
            mouseY: 0,

            tempHistory: [],

            color: '#13c5f7',
            popups: {
                showColor: false,
                showSize: false,
                showWelcome: true,
                showSave: false,
                showOptions: false
            },
            options: {
                restrictY: false,
                restrictX: false
            },
            save: {
                name: '',
                saveItems: []
            },
            size: 12,
            colors: [
                '#d4f713',
                '#13f7ab',
                '#13f3f7',
                '#13c5f7',
                '#138cf7',
                '#1353f7',
                '#2d13f7',
                '#7513f7',
                '#a713f7',
                '#d413f7',
                '#f713e0',
                '#f71397',
                '#f7135b',
                '#f71313',
                '#f76213',
                '#f79413',
                '#f7e013',
                '#000000'],
            sizes: [6, 12, 24, 48],
            weights: [2, 4, 6],
            image_data: "",
            history: [],
            result: [],
            processing: false,
            downloading: false

        }
    },


    mounted() {


    },

    methods: {
        removeHistoryItem() {
            this.history.splice(this.history.length - 2, 1);
            this.redraw();
        },
        removeAllHistory() {
            this.history = []
            this.redraw();
        },
        simplify() {
            var simpleHistory = [];
            this.history.forEach((item, i) => {
                if (i % 6 !== 1 || item.isDummy) {
                    simpleHistory.push(item);
                }
            });
            this.history = simpleHistory;
            this.redraw();
        },

        jumble() {
            var simpleHistory = [];
            this.history.forEach((item, i) => {
                item.r += Math.sin(i * 20) * 5;
            });
            this.history = this.shuffle(this.history);
            this.redraw();
        },

        shuffle(a) {
            var b = [];

            a.forEach((item, i) => {
                if (!item.isDummy) {
                    var l = b.length;
                    var r = Math.floor(l * Math.random());
                    b.splice(r, 0, item);
                }
            });

            for (var i = 0; i < b.length; i++) {
                if (i % 20 === 1) {
                    b.push(this.getDummyItem());
                }
            }

            return b;
        },

        saveItem() {

            if (this.save.name.length > 2) {
                var historyItem = {
                    history: this.history.slice(),
                    name: this.save.name
                };

                this.save.saveItems.push(historyItem);
                this.save.name = "";
            }
        },
        loadSave(item) {
            this.history = item.history.slice();
            this.redraw();
        },



        // Drawing

        listen() {
            this.c.addEventListener('mousedown', (e) => {
                this.mouseDown = true;
                this.mouseX = e.offsetX;
                this.mouseY = e.offsetY;
                this.setDummyPoint();
            });

            this.c.addEventListener('mouseup', () => {
                if (this.mouseDown) {
                    this.setDummyPoint();
                }
                this.mouseDown = false;
            });

            this.c.addEventListener('mouseleave', () => {
                if (this.mouseDown) {
                    this.setDummyPoint();
                }
                this.mouseDown = false;
            });

            this.c.addEventListener('mousemove', (e) => {
                this.moveMouse(e);

                if (this.mouseDown) {
                    this.mouseX = this.mouseX;
                    this.mouseY = this.mouseY;

                    if (!this.options.restrictX) {
                        this.mouseX = e.offsetX;
                    }

                    if (!this.options.restrictY) {
                        this.mouseY = e.offsetY;
                    }

                    var item = {
                        isDummy: false,
                        x: this.mouseX,
                        y: this.mouseY,
                        c: this.color,
                        r: this.size
                    };

                    this.history.push(item);
                    this.draw(item, this.history.length);
                }
            });

            window.addEventListener('resize', () => {
                this.setSize();
                this.redraw();
            });
        },

        setSize() {
            this.c.width = window.innerWidth;
            this.c.height = window.innerHeight - 60;
        },

        moveMouse(e) {
            let x = e.offsetX;
            let y = e.offsetY;

            var cursor = document.getElementById('cursor');

            cursor.style.transform = `translate(${x - 10}px, ${y - 10}px)`;
        },

        getDummyItem() {
            var lastPoint = this.history[this.history.length - 1];

            return {
                isDummy: true,
                x: lastPoint.x,
                y: lastPoint.y,
                c: null,
                r: null
            };
        }
        ,
        setDummyPoint() {
            var item = this.getDummyItem();
            this.history.push(item);
            this.draw(item, this.history.length);
        }
        ,
        redraw() {
            this.ctx.clearRect(0, 0, this.c.width, this.c.height);
            this.drawBgDots();

            if (!this.history.length) {
                return true;
            }

            this.history.forEach((item, i) => {
                this.draw(item, i);
            });
        }
        ,
        drawBgDots() {
            var gridSize = 50;
            this.ctx.fillStyle = 'rgba(0, 0, 0, .2)';

            for (var i = 0; i * gridSize < this.c.width; i++) {
                for (var j = 0; j * gridSize < this.c.height; j++) {
                    if (i > 0 && j > 0) {
                        this.ctx.beginPath();
                        this.ctx.rect(i * gridSize, j * gridSize, 2, 2);
                        this.ctx.fill();
                        this.ctx.closePath();
                    }
                }
            }
        },

        draw(item, i) {
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = "round";

            var prevItem = this.history[i - 2];

            if (i < 2) {
                return false;
            }

            if (!item.isDummy && !this.history[i - 1].isDummy && !prevItem.isDummy) {
                this.ctx.strokeStyle = item.c;
                this.ctx.lineWidth = item.r;

                this.ctx.beginPath();
                this.ctx.moveTo(prevItem.x, prevItem.y);
                this.ctx.lineTo(item.x, item.y);
                this.ctx.stroke();
                this.ctx.closePath();
            } else if (!item.isDummy) {
                this.ctx.strokeStyle = item.c;
                this.ctx.lineWidth = item.r;

                this.ctx.beginPath();
                this.ctx.moveTo(item.x, item.y);
                this.ctx.lineTo(item.x, item.y);
                this.ctx.stroke();
                this.ctx.closePath();

            }


        },


        async Download() {
            this.downloading = true

            let canvas = document.getElementById('canvas');

            const options = {
                type: "dataURL",
            }


            const printCanvas = await html2canvas(canvas, options)

            const link = document.createElement('a');
            link.setAttribute('download', 'download-Geez.png');
            link.setAttribute('href', printCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
            link.click();





            // Send Post Request


            console.log("done")
            this.downloading = false

        },



        async takeshot() {
            this.processing = true

            let canvas = document.getElementById('canvas');

            const options = {
                type: "dataURL",
            }


            const printCanvas = await html2canvas(canvas, options)

            const link = document.createElement('a');
            link.setAttribute('download', 'download.png');
            link.setAttribute('href', printCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));



            var image = printCanvas.toDataURL("image/png");

            const file = this.dataURLtoFile(image, 'my-image.png');
            console.log(file)

            const formData = new FormData();

            formData.append('image', file, 'my-image.png');

            // Send Post Request
            const url = "http://192.168.0.66:4545/api/digit/recognition/"


            axios
                .post(url, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",

                    },

                })
                .then((response) => {
                    console.log(response);
                    this.result = response.data;
                    this.processing = false


                    this.$modal.show('example')

                })
                .catch((response) => {
                    console.log(response);
                    this.result = response.data;
                    this.processing = false

                    this.$modal.show('example')
                }
                );

            console.log(formData);


            console.log(printCanvas.toDataURL("image/png"))
            console.log("done")

        },

        async takeshot() {
            this.processing = true

            let canvas = document.getElementById('canvas');

            const options = {
                type: "dataURL",
            }


            const printCanvas = await html2canvas(canvas, options)

            const link = document.createElement('a');
            link.setAttribute('download', 'download.png');
            link.setAttribute('href', printCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));



            var image = printCanvas.toDataURL("image/png");

            const file = this.dataURLtoFile(image, 'my-image.png');
            console.log(file)

            const formData = new FormData();

            formData.append('image', file, 'my-image.png');

            // Send Post Request
            const url = "http://192.168.0.66:4545/api/digit/recognition/"


            axios
                .post(url, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",

                    },

                })
                .then((response) => {
                    console.log(response);
                    this.result = response.data;
                    this.processing = false


                    this.$modal.show('example')

                })
                .catch((response) => {
                    console.log(response);
                    this.result = response.data;
                    this.processing = false

                    this.$modal.show('example')
                }
                );

            console.log(formData);


            console.log(printCanvas.toDataURL("image/png"))
            console.log("done")

        },



        SaveChanges(event) {
            const img = event.target.files[0];



            this.image_data = img;

        },

        Upload() {

            this.processing = true
            const formData = new FormData();
            console.log(this.image_data)
            formData.append('image', this.image_data, this.image_data.name);

            // Send Post Request
            const url = "http://192.168.0.66:4545/api/digit/recognition/"


            axios
                .post(url, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",

                    },
                })
                .then((response) => {
                    console.log(response);
                    this.result = response.data;
                    this.$modal.show('example')
                    this.processing = false


                })
                .catch((response) => {
                    console.log(response);
                    this.result = response.data;
                    this.$modal.show('example')
                    this.processing = false


                });

        },
        dataURLtoFile(dataurl, filename) {

            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);

            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }

            return new File([u8arr], filename, { type: mime });
        }
    },

    mounted() {

        this.c = document.getElementById('canvas');
        this.ctx = this.c.getContext('2d');

        this.mouseDown = false;
        this.mouseX = 0;
        this.mouseY = 0;

        this.tempHistory = [];

        this.setSize();

        this.listen();

        this.redraw();
    }

}


</script>

<style scoped>
.colors {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}

form {

    background-color: #7fff00;
}

form input {
    padding: 10px 10px;
    margin-right: 5px;
    color: rgb(11, 105, 192);
    border: none;
}

.bg {
    background-color: #0095ff !important;
    width: 100%;
    height: 100%;
}
</style>

