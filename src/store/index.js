import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const dbNameHair = "hairDb";
const storeNameHair = "hairUrls";
const dbNameColor = "colorDb";
const storeNameColor = "colorUrls";

export default new Vuex.Store({
    state: {
        showAppBar: true,
        hairImages: [],
        colorImages: [],
        uploadedImage: null,
        uploadedColorImage: null,
        uploadedFaceImage: null,
        
    },
    mutations: {
        SET_UPLOADED_COLOR_IMAGE(state, image) {
            state.uploadedColorImage = image;
        },
        SET_UPLOADED_IMAGE(state, image) {
            state.uploadedImage = image;
        },
        SET_UPLOADED_FACE_IMAGE(state, images) {
            state.uploadedFaceImage = images;
        },
        SET_SHOW_APP_BAR(state, value) {
            state.showAppBar = value;
        },
        SET_HAIR_IMAGES(state, images) {
            state.hairImages = images;
        },
        SET_COLOR_IMAGES(state, images) {
            state.colorImages = images;
        },

    },
    actions: {
        async fetchImagesFromIndexedDB({ commit }, { dbName, storeName }) {
            return new Promise((resolve) => {
                const request = indexedDB.open(dbName, 1);

                request.onerror = (event) => {
                    console.error("IndexedDB error:", event.target.error);
                    resolve([]);
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
                        const images = event.target.result.map(
                            (item) => "data:image/png;base64," + item.url
                        );
                        resolve(images);
                    };
                };
            });
        },

        async fetchAndStoreImagesFromServer(
            { commit, dispatch },
            { dbName, storeName, commitType }
        ) {
            // Add dispatch here
            try {
                const response = await fetch("/api/send_pic");
                const data = await response.json();

                if (data.error) {
                    console.error(data.error);
                } else {
                    let images;
                    if (dbName === dbNameHair) {
                        images = data.hair;
                    } else {
                        images = data.color;
                    }
                    await dispatch("storeImagesInIndexedDB", {
                        dbName,
                        storeName,
                        imageUrls: images,
                    }); // Use dispatch

                    commit(
                        commitType,
                        images.map((img) => "data:image/png;base64," + img)
                    );


                }
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        },

        storeImagesInIndexedDB({ commit }, { dbName, storeName, imageUrls }) {
            // Change to regular function
            const request = indexedDB.open(dbName, 1);

            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction([storeName], "readwrite");
                const store = transaction.objectStore(storeName);
                imageUrls.forEach((imageUrl) => {
                    store.add({ url: imageUrl });
                });
            };
        },

        async fetchImagesHair({ commit, dispatch }) {
            const hairImages = await dispatch("fetchImagesFromIndexedDB", {
                dbName: dbNameHair,
                storeName: storeNameHair,
            });
            if (hairImages.length <= 0) {
                await dispatch("fetchAndStoreImagesFromServer", {
                    dbName: dbNameHair,
                    storeName: storeNameHair,
                    commitType: "SET_HAIR_IMAGES",
                });


            } else {

                commit("SET_HAIR_IMAGES", hairImages);
            }
        },

        async fetchImagesColor({ commit, dispatch }) {
            const colorImages = await dispatch("fetchImagesFromIndexedDB", {
                dbName: dbNameColor,
                storeName: storeNameColor,
            });
            if (colorImages.length <= 0) {
                await dispatch("fetchAndStoreImagesFromServer", {
                    dbName: dbNameColor,
                    storeName: storeNameColor,
                    commitType: "SET_COLOR_IMAGES",
                });

            } else {

                commit("SET_COLOR_IMAGES", colorImages);
            }
        },
    },
});
