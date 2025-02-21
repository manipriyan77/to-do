import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'


const initialState = { userName: "", password: "" }


const userSlice = createSlice({
    name: "user", initialState, reducers: {
        login(state, action)
        {
            const { userName, password } = action.payload;

            // Set the cookie (for example, a simple token or username cookie)
            Cookies.set('todoLoggedIn', true, { expires: 7 }); // Cookie expires in 7 days

            // Optionally, you can also update the Redux state if you want to store the values in the Redux state
            state.userName = userName;
            state.password = password;
        }
    }
})

export const { login } = userSlice.actions
export default userSlice.reducer