/*
* devRant API
*
* created by Kj Drougge on 2017-03-20.
*/

import axios from 'axios'

const rootURL = 'https://www.devrant.io/api'
const appId = 3

/**
* Get id from username
* @param {String} username - username of user
* @return {Promise}        - resolves with the HTTP response
*/
export function getUserId (username) {
  const path = `/get-user-id?app=${appId}&username=${username}`
  return GET(path)
}

/**
* Get rant for specific id
* @param {Number} id - id of rant
* @return {Promise}  - resolves with the HTTP response
*/
export function getRant (id) {
  const path = `/devrant/rants/${id}?app=${appId}`
  return GET(path)
}

/**
* Get rants
* @param {String} sort  - sort options ('algo', 'recent' or 'top'). Default is 'algo'
* @param {Number} limit - limit of rants received. Default is 50
* @param {Number} skip  - number of rants to skip. Default is 0
* @return {Promise}     - resolves with the HTTP response
*/
export function getRants (sort = 'algo', limit = 50, skip = 0) {
  const path = `/devrant/rants?app=${appId}&sort=${sort}&limit=${limit}&skip=${skip}`
  return GET(path)
}

/**
* Search
* @param {String} term - search term
* @return {Promise}    - resolves with the HTTP response
*/
export function search (term) {
  const path = `/devrant/rants?app=${appId}&term=${term}`
  return GET(path)
}

/**
* Get profile
* @param {Number} userId - id of user
* @return {Promise}      - resolves with the HTTP response
*/
export function getProfile (userId) {
  const path = `/users/${userId}?app=${appId}`
  return GET(path)
}

  /***************/
 /*   HELPERS   */
/***************/

/**
* Does a GET request for the path
* @param {String} path - the path to call
* @return {Promise}    - resolves with the HTTP response
*/
function GET (path) {
  return axios({
    method: 'GET',
    url: path,
    baseURL: rootURL,
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => {
    const status = response.status
    const statusText = response.statusText

    if (status !== 200) {
      const error = new Error(`Request failed: ${status} ${statusText}`)
      err.status = status
      throw error
    }
    return response.data
  })
  .catch(error => {
    console.log(`Error: ${error}`)
    throw error
  })
}

function POST () { }
