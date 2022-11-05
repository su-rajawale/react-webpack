import React from "react"

export type employeesType = {
    name: string,
    username: string,
    email: string,
    phone: string,
    website: string,
    id: number
}

export type changeUserProps = {
    id?: number,
    close: () => void
} & React.ComponentProps
