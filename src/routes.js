import AboutUs from './components/AboutUs.vue'
import Home from './components/Home.vue'
import IdentifiedItem from './components/IdentifiedItem.vue'
import Login from './components/Login.vue'
import MapOfBins from './components/MapOfBins.vue'
import MyAchievements from './components/MyAchievements.vue'
import MyProfile from './components/MyProfile.vue'
import MyRewards from './components/MyRewards.vue'
import RecyclingHistory from './components/RecyclingHistory.vue'
import Registration from './components/Registration.vue'

export default[
    { name:'AboutUs', path: '/AboutUs', component: AboutUs},
    { name:'Home', path: '/Home', component: Home},
    { name:'IdentifiedItem', path: '/IdentifiedItem', component: IdentifiedItem },
    { name:'Login', path: '/', component: Login},
    { name:'MapOfBins', path: '/MapOfBins', component: MapOfBins},
    { name:'MyAchievements', path: '/MyAchievements', component: MyAchievements},
    { name:'MyProfile', path: '/MyProfile', component: MyProfile},
    { name:'MyRewards', path: '/MyRewards', component: MyRewards},
    { name:'RecyclingHistory', path: '/RecyclingHistory', component: RecyclingHistory},
    { name:'Registration', path: '/Registration', component: Registration}
]
