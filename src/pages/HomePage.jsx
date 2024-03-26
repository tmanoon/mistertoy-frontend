import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { CHANGE_BY } from "../store/reducers/user.reducer.js"

// const { useState } = React
// const { useSelector, useDispatch } = ReactRedux

export function HomePage() {
    const dispatch = useDispatch()

    return (
        <section>
            Welcome to our Mister Toy store!
        </section >
    )
}