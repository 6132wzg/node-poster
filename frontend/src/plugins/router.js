import qs from 'qs'

const router = {
  query() {
    let search = document.location.search
    if (search[0] === '?') {
      search = search.slice(1)
    }
    if (!search) {
      return {}
    }
    return qs.parse(search)
  }
}

export default router
