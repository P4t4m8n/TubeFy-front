export function onDragEnd (result)  {
    console.log("result:", result)
    const { source, destination } = result
    console.log("destination:", destination)
    console.log("source:", source)
  
    // Dropped outside the list
    if (!destination) {
      return
    }
  
    if (source.droppableId !== destination.droppableId) {
      console.log("destination.droppableId:", destination.droppableId)
      console.log("source.droppableId:", source.droppableId)
      // Logic for moving items between different lists (components)
  
      // Example:
      // 1. Find the dragged item in the source list
      // 2. Remove it from the source list
      // 3. Add it to the destination list
  
      // You'll need a way to access and update the states of both components
    } else {
      // Logic for reordering within the same list
      // This part is optional if you're not allowing reordering within a list
    }
  }
  