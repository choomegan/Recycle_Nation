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
import ForgotPassword from './components/ForgotPassword.vue'

export default[
    { name:'About Us', path: '/AboutUs', component: AboutUs},
    { name:'Home', path: '/Home', component: Home},
    { name:'Identified Item', path: '/IdentifiedItem/:data', component: IdentifiedItem }, 
    { name:'Login', path: '/Login/:data', component: Login}, // data in form of {"01-01-2021":["glass":40]}
    { name:'Login', path: '/', component: Login}, //entrypoint to website
    { name:'Map Of Bins', path: '/MapOfBins', component: MapOfBins},
    { name:'My Achievements', path: '/MyAchievements', component: MyAchievements},
    { name:'My Profile', path: '/MyProfile', component: MyProfile},
    { name:'Rewards Shop', path: '/MyRewards', component: MyRewards},
    { name:'Recycling History', path: '/RecyclingHistory', component: RecyclingHistory},
    { name:'Registration', path: '/Registration', component: Registration},
    { name:'Forgot Password', path: '/ForgotPassword', component: ForgotPassword}
]
