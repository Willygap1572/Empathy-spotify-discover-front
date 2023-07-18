import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../components/HomePage.vue';
import RecommendationsPage from '../components/RecommendationsPage.vue';
import ManagePlaylist from '../components/ManagePlaylist.vue';
import PlaylistDetail from '../components/PlaylistDetail.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/recommendations',
        name: 'Recommendations',
        component: RecommendationsPage,
    },
    {
        path: '/playlists',
        name: 'Playlists',
        component: ManagePlaylist,
    },
    {
        path: '/playlistsdetail',
        name: 'PlaylistDetail',
        component: PlaylistDetail,
    }
    // Otras rutas que puedas tener
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
