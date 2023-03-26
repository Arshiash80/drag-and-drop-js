// const draggables = document.querySelectorAll(".draggable")
const container = document.getElementById("container")


const dataList = [
    "Arshia",
    "Ali",
    "Fatma",
    "Josh",
    "Alice"
]



function fillDraggableContainer(draggableList) {
    $("#container").html(null)
    draggableList.forEach(draggable => {
        $("#container").append(draggable)
    })
}

let draggablesList = dataList.map((item, index) => {
    const draggableItem = document.createElement("li")
    draggableItem.innerHTML = `
        ${item}
        <span>${index + 1}</span>
    `
    draggableItem.setAttribute("data-index", index)
    draggableItem.classList.add("draggable")
    draggableItem.draggable = true
    return draggableItem
})

fillDraggableContainer(draggablesList)


draggablesList.forEach(draggable => {
    draggable.addEventListener('dragstart', (item) => {
        draggable.classList.add("dragging")
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove("dragging")
        var list = document.getElementsByClassName("draggable");
        for (let i = 0; i < list.length; i++) {
            const item = list[i]
            item.setAttribute("data-index", i)
            item.children[0].textContent = i + 1
        }
    })
})


container.addEventListener('dragover', (e) => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientX)
    // console.log(afterElement)
    const draggable = document.querySelector(".dragging")
    if (!afterElement) {
        // Last of the list
        container.appendChild(draggable)
    } else {
        // const draggableIndex = draggable.getAttribute("data-index")
        // const afterElementIndex = afterElement.getAttribute("data-index")
        // const toIndex = Number(afterElementIndex) - 1

        // Before other element
        container.insertBefore(draggable, afterElement)
    }
})




function getDragAfterElement(container, mouseXPosition) {
    const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = mouseXPosition - box.left - box.width / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}