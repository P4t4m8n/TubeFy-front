// const [isExpanded, setIsExpanded] = useState(false)
// const dispatch = useDispatch()
// const sidebarWidth = useSelector((state) => state.sidebarModule?.width || 'defaultWidth');
// const isSidebarResizing = useSelector((state) => state.sidebarModule?.isResizing || false);

// const toggleExpansion = () => {
//   setIsExpanded(!isExpanded);
// };

// const handleMouseDown = () => {
//   dispatch(startResizing());
// };

// const handleMouseUp = () => {
//   if (isSidebarResizing) {
//     dispatch(stopResizing());
//   }
// };

// const handleMouseMove = (e) => {
//   e.preventDefault()
//   if (isSidebarResizing) {
//     const newWidth = Math.min(Math.max(e.clientX, 200), document.body.clientWidth - 400); // Enforce min and max width
//     dispatch(resizeSidebar(newWidth));
//   }
// };

// <div
// className="app"
// onMouseMove={handleMouseMove}
// onMouseUp={handleMouseUp}
// onMouseLeave={handleMouseUp} // To handle the case where the mouse leaves the window
// >
// <div className={`main-container ${isExpanded ? 'expanded' : ''}`}>
//   <div className="sidebar" style={{ width: `${sidebarWidth}px` }}>

//   <div className="resizer" onMouseDown={handleMouseDown} />
//           </div>
//           <main className="main-content">

//           <RightSidebar className="right-sidebar" onToggle={toggleExpansion} />
//       <AppFooter className="app-footer" onToggleExpansion={toggleExpansion} />