import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const dbName = "hairDb";
const storeName = "hairUrls";
const dbName2 = "ColorDb";
const storeName2 = "ColorUrls";

export default new Vuex.Store({
    state: {
        showAppBar: true,
        images: [],
        colorImages: [],

       
        uploadedImage: null,
        uploadedColorImage: null,
    },
    mutations: {
        SET_UPLOADED_COLOR_IMAGE(state, image) {
            state.uploadedColorImage = image;
        },
        SET_UPLOADED_IMAGE(state, image) {
            state.uploadedImage = image;
        },
        SET_SHOW_APP_BAR(state, value) {
            state.showAppBar = value;
        },
        SET_IMAGES(state, images) {
            state.images = images;
        },
        SET_COLOR_IMAGES(state, images) {
            state.colorImages = images;
        },
        ADD_IMAGE(state, image) {
            state.images.push(image);
        },
        ADD_COLOR_IMAGE(state, image) {
            state.colorImages.push(image);
        },
    },
    actions: {
        async fetchImagesColor({ commit }) {
            const request = indexedDB.open(dbName2, 1);

            request.onerror = (event) => {
                console.error("IndexedDB error:", event.target.error);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(storeName2)) {
                    db.createObjectStore(storeName2, {
                        keyPath: "id",
                        autoIncrement: true,
                    });
                }
            };

            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction([storeName2], "readonly");
                const store = transaction.objectStore(storeName2);
                const getAllRequest = store.getAll();

                getAllRequest.onsuccess = (event) => {
                    const images = event.target.result.map((item) => {
                        return "data:image/png;base64," + item.url;
                    });

                    if (images.length > 0) {
                        const customImage = require('@/assets/plus.png');
                        images.push(customImage);
                        commit('SET_COLOR_IMAGES', images);
                    } else {
                        this.dispatch('fetchAndStoreImagesColor');
                    }
                };
            };
        },

        async fetchAndStoreImagesColor({ commit }) {
            try {
                const response = await fetch("/api/send_pic");
                const data = await response.json();

                if (data.error) {
                    console.error(data.error);
                } else {
                    const request = indexedDB.open(dbName2, 1);

                    request.onsuccess = (event) => {
                        const db = event.target.result;
                        const transaction = db.transaction([storeName2], "readwrite");
                        const store = transaction.objectStore(storeName2);
                        data.images.forEach((imageUrl) => {
                            store.add({ url: imageUrl });
                        });

                        const images = data.images.map(
                            (image) => "data:image/png;base64," + image
                        );
                        const customImage = require('@/assets/plus.png');
                        images.push(customImage);
                        commit('SET_COLOR_IMAGES', images);
                    };
                }
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        },

        async fetchImagesHair({ commit }) {
            const request = indexedDB.open(dbName, 1);

            request.onerror = (event) => {
                console.error("IndexedDB error:", event.target.error);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName, {
                        keyPath: "id",
                        autoIncrement: true,
                    });
                }
            };

            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction([storeName], "readonly");
                const store = transaction.objectStore(storeName);
                const getAllRequest = store.getAll();

                getAllRequest.onsuccess = (event) => {
                    const images = event.target.result.map((item) => {
                        return "data:image/png;base64," + item.url;
                    });

                    if (images.length > 0) {
                        const customImage = require('@/assets/plus.png');
                        images.push(customImage);
                        commit('SET_IMAGES', images);
                    } else {
                        this.dispatch('fetchAndStoreImagesHair');
                    }
                };
            };
        },

        async fetchAndStoreImagesHair({ commit }) {
            try {
                const response = await fetch("/api/send_pic");
                const data = await response.json();

                if (data.error) {
                    console.error(data.error);
                } else {
                    const request = indexedDB.open(dbName, 1);

                    request.onsuccess = (event) => {
                        const db = event.target.result;
                        const transaction = db.transaction([storeName], "readwrite");
                        const store = transaction.objectStore(storeName);
                        data.images.forEach((imageUrl) => {
                            store.add({ url: imageUrl });
                        });

                        const images = data.images.map(
                            (image) => "data:image/png;base64," + image
                        );
                        const customImage = require('@/assets/plus.png');
                        images.push(customImage);
                        commit('SET_IMAGES', images);
                    };
                }
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        },
    },
});
