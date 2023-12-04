import {useEffect,useRef} from 'react'
import logo from '../../assets/images/logo.png'
import { NavLink } from 'react-router-dom'
import { BiMenu } from 'react-icons/bi'
// import {useSelector } from 'react-redux'
import { FiLogOut } from 'react-icons/fi'
// import { useLogoutMutation } from '../../slices/adminSlices/adminApiSlice'?
// import { logout } from '../../slices/adminSlices/adminAuthSlice'

const navlinks = [
  {
    path:'/admin/home',
    display:'Home'
  },
  {
    path:'/admin/users',
    display:'Users'
  },
  {
    path:'/admin/doctors',
    display:'Doctors'
  },
  {
    path:'/admin/bookings',
    display:'Bookings'
  }
]
const AdminHeader = () => {

    //const { adminInfo } = useSelector((state)=>state.adminAuth);

    const headerRef = useRef(null)
    const menuRef = useRef(null)

    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const [logoutApiCall] = useLogoutMutation();
    // const logoutHandler = async()=>{
    //   try {
    //     await logoutApiCall().unwrap();
    //     dispatch(logout());
    //     navigate('/admin');
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
  
    const handleStickyHeader = ()=>{
      window.addEventListener('scroll',()=>{
        if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
          headerRef.current.classList.add('sticky__header')
        }else{
          headerRef.current.classList.remove('sticky__header')
        }
      })
    }
  
    useEffect(() => {
      handleStickyHeader()
    
      return () => {
        window.removeEventListener('scroll',handleStickyHeader)
      }
    },)
  
    const toggleMenu = ()=>menuRef.current.classList.toggle('show__menu')
  
    return (
      <header className="flex items-center header" ref={headerRef}>
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <img src={logo} alt="medicarelogo" />
            </div>
  
         
                <>
                  <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                    <ul className="menu flex items-center gap-[2.7rem]">
                      {
                        navlinks.map((link,index)=>
                          <li key={index}>
                            <NavLink to={link.path} className={navClass=>navClass.isActive?'text-primaryColor text-[16px] loading-7 font-[600]' : 'text-textColor text-[16px] loading-7 font-[500] hover:text-primaryColor'}>{link.display}</NavLink>
                          </li>
                        )
                      }
                      <li  className='font-bold text-red-500 md:hidden'>
                        LOGOUT
                      </li>
                      <li className='hidden md:block'>
                        <FiLogOut  style={{ fontSize: '2rem', cursor:'pointer', color: 'blue', backgroundColor:'#fff2e6' }}/>
                      </li>
                    </ul>
                  </div>
                  <span className='md:hidden' onClick={toggleMenu}>
                    <BiMenu className='w-6 h-6 cursor-pointer'/>
                  </span>
                </>
              
            
          </div>
        </div>
      </header>
    )
  }

export default AdminHeader