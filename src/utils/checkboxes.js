export const activateCheckboxes = () => {
  document
    .querySelectorAll("input[type='checkbox'][disabled]")
    .forEach(el => (el.disabled = false))
}

const syncCheckboxes = (db, data) => {
  const checkboxes = Array.from(
    document.querySelectorAll("li.task-list-item")
  ).map(el => ({
    text: el.innerText,
    page: window.location.pathname,
    el,
  }))
  const store = db
    .transaction("checkboxes", "readwrite")
    .objectStore("checkboxes")

  // Find new checkboxes, add to store
  checkboxes
    .filter(
      checkbox =>
        !data.find(cb => cb.text === checkbox.text && cb.page === checkbox.page)
    )
    .map(({ text, page, el }) => ({
      text,
      page,
      checked: el.querySelector("input").checked,
    }))
    .forEach(checkbox => store.add(checkbox))

  // Load all checkboxes, sync state and add listener for change
  store.getAll().onsuccess = event => {
    checkboxes.forEach(checkbox => {
      const dbCheckbox = event.target.result.find(
        dbCb => dbCb.text === checkbox.text && dbCb.page === checkbox.page
      )
      const checkboxInput = checkbox.el.querySelector("input")
      if (dbCheckbox.checked) {
        checkboxInput.checked = true
      }
      checkboxInput.addEventListener("change", event => {
        const {
          target: { checked },
        } = event
        const checkboxStore = db
          .transaction("checkboxes", "readwrite")
          .objectStore("checkboxes")
        checkboxStore.put({ ...dbCheckbox, checked })
      })
    })
  }
}

export const setupDatabase = () => {
  if (!"indexedDB" in window) {
    console.log("No IndexedDB")
    return
  }

  const dbRequest = window.indexedDB.open(
    "documenters-field-guide-checkbox-db",
    1
  )

  dbRequest.onerror = () => console.log("indexedDB not allowed")

  dbRequest.onupgradeneeded = event => {
    const db = event.target.result
    const store = db.createObjectStore("checkboxes", {
      keyPath: "id",
      autoIncrement: true,
    })
    store.createIndex("text", "text", { unique: false })
    store.createIndex("page", "page", { unique: false })
  }

  dbRequest.onsuccess = event => {
    const db = event.target.result
    const store = db
      .transaction("checkboxes", "readonly")
      .objectStore("checkboxes")
    store.getAll().onsuccess = evt => {
      syncCheckboxes(db, evt.target.result)
    }
  }
}
