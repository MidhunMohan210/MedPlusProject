import { Dna } from  'react-loader-spinner'

function Loader() {
  return (
    <div className='flex items-center justify-center w-full h-full'>
        
        <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        />
      
    </div>
  )
}

export default Loader
