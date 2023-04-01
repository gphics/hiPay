

// @ts-ignore
function LoadingComponent({customId}) {
  return (
      <div id={customId} className="loading_component_holder">
          <section>
        <div className="loader"></div>
        <div className="loader"></div>
        <div className="loader"></div>
        <div className="loader"></div>
         </section> 
    </div>
  )
}

export default LoadingComponent