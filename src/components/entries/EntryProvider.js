import React, { createContext, useState } from "react"
import { authApi, apiAuthorizationRequest } from "../auth/authSettings"

export const EntryContext = createContext()

export const EntryProvider = (props) => {
    const [entries, setEntries] = useState([])

    const getEntries = () => {
        return fetch(`${authApi.localApiBaseUrl}/entries`, {
            headers: {
                "Authorization": `Token ${apiAuthorizationRequest}`
            }
        })
            .then(res => res.json())
            .then(setEntries)
    }

    const getSingleEntry = (entryId) => {
        return fetch(`${authApi.localApiBaseUrl}/entries/${entryId}`, {
            headers: {
                "Authorization": `Token ${apiAuthorizationRequest}`
            }
        })
            .then(res => res.json())
    }

    const addEntry = (entryObject) => {
        return fetch(`${authApi.localApiBaseUrl}/entries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${apiAuthorizationRequest}`
            },
            body: JSON.stringify(entryObject)
        })
            .then(res => res.json())
    }
    
    const updateEntry = (entryObject) => {
        return fetch(`${authApi.localApiBaseUrl}/entries/${entryObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${apiAuthorizationRequest}`
            },
            body: JSON.stringify(entryObject)
        })
    }

    const addFavoriteEntry = (entryId) => {
        return fetch(`${authApi.localApiBaseUrl}/entries/${entryId}/favorite`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${apiAuthorizationRequest}`
            }
        })
    }

    const deleteFavoriteEntry = (entryId) => {
        return fetch(`${authApi.localApiBaseUrl}/entries/${entryId}/favorite`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${apiAuthorizationRequest}`
            }
        })
    }

    return (
        <EntryContext.Provider value={{
            entries, getEntries, getSingleEntry, addEntry, updateEntry, addFavoriteEntry, deleteFavoriteEntry
        }}>
            {props.children}
        </EntryContext.Provider>
    )
}