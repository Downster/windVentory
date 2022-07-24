import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LoginForm from './LoginForm'
import {
    CloudUploadIcon,
    LocationMarkerIcon,
    MenuIcon,
    ChatAlt2Icon,
    LightningBoltIcon,
    UserGroupIcon,
    CollectionIcon,
    XIcon,
} from '@heroicons/react/outline'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { Modal } from "../../context/Modal";
import { useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom'
import SignupForm from './SignUpForm'

const navigation = [
    { name: 'Product', href: '#product' },
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'About the developer', href: 'https://bdowning.codes/#about', target: "_blank", rel: "noopener noreferrer" },
]
const features = [
    {
        name: 'Location Services',
        description: 'Sweating in the summer Illinois heat and want to go ice skating? Worry not, and search for the closest ice rink to your hotel.',
        icon: LocationMarkerIcon,
    },
    {
        name: 'Live Chat',
        description: 'Worried your teammate is going to forget to fill the cooler with ice? Send them a message on windVentory to be sure they don\'t forget.',
        icon: ChatAlt2Icon,
    },
    {
        name: 'Inventory Management',
        description: 'Manage and view your job site and team inventory in real time. No more worrying about running out of fiberglass when you\'re about to head into laminations.',
        icon: CollectionIcon,
    },
    {
        name: 'Weather',
        description: 'Get your jobsites humidity, windspeed, temperature and more. No more messing with multiple weather apps to see the weather conditions.',
        icon: LightningBoltIcon,
    },
    {
        name: 'Admin Management',
        description:
            'Setup and manage all the jobsites, users and teams for your company',
        icon: UserGroupIcon,
    },
    {
        name: 'Image Uploads',
        description: 'Keep your inventory organized, and teammates on their toes with AWS S3 image uploading',
        icon: CloudUploadIcon,
    },
]

const footerNavigation = {
    frontend: [
        { name: 'React.js', href: 'https://reactjs.org/' },
        { name: 'Tailwind.css', href: 'https://tailwindcss.com/' },
        { name: 'Redux', href: 'https://redux.js.org/' },
        { name: 'Javascript', href: 'https://www.javascript.com/' },
    ],
    backend: [
        { name: 'Flask', href: 'https://flask.palletsprojects.com/en/2.1.x/' },
        { name: 'PostgreSQL', href: 'https://postgresql.org/' },
        { name: 'SQLAlchemy', href: 'https://www.sqlalchemy.org/' },
    ],
    addons: [
        { name: 'AWS S3', href: 'https://aws.amazon.com/pm/serv-s3/?trk=fecf68c9-3874-4ae2-a7ed-72b6d19c8034&sc_channel=ps&sc_campaign=acquisition&sc_medium=ACQ-P|PS-GO|Brand|Desktop|SU|Storage|S3|US|EN|Text&s_kwcid=AL!4422!3!488982706719!e!!g!!aws%20s3&ef_id=CjwKCAjw2rmWBhB4EiwAiJ0mtcgLyhcGwtpIQwcAd-w8P7nfD4vZPr0rEd5oekSu4ZfVUS2mhRNf7xoCuQwQAvD_BwE:G:s&s_kwcid=AL!4422!3!488982706719!e!!g!!aws%20s3' },
        { name: 'Socket.io', href: 'https://socket.io/' },
        { name: 'Leaflet.js', href: 'https://leafletjs.com/' },
        { name: 'Nominatim API', href: 'https://nominatim.org/' },
        { name: 'Docker', href: 'https://www.docker.com/' },
    ],
    social: [
        {
            name: 'Instagram',
            href: 'https://www.instagram.com/badtraddad/',
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: 'GitHub',
            href: 'https://www.github.com/downster',
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: 'Linked In',
            href: 'http://www.linkedin.com/in/brendan-downing',
            icon: (props) => (
                <svg fill='currentColor' viewBox="0 0 128 128" {...props}>
                    <path fill="#0076b2" d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3z"></path><path fill="#fff" d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 11-10.5 10.49 10.5 10.5 0 0110.5-10.49M50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z"></path>
                </svg>
            ),
        },
    ],
}

export default function SplashPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [showModal, setShowModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [email, setEmail] = useState('')
    const demoUser = async (e) => {
        e.preventDefault()
        const credentials = {
            username: 'demo@demo.com',
            password: 'password'
        }
        await dispatch(sessionActions.login(credentials))
        history.push('/')
    }
    return (
        <div className="bg-white">
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
            {showSignUpModal && (
                <Modal onClose={() => setShowSignUpModal(false)}>
                    <SignupForm inputEmail={email} />
                </Modal>
            )}
            <div className="relative overflow-hidden">
                <Popover as="header" className="relative">
                    <div className="bg-gray-900 pt-6">
                        <nav
                            className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
                            aria-label="Global"
                        >
                            <div className="flex items-center flex-1">
                                <div className="flex items-center justify-between w-full md:w-auto">

                                    <i className="fa-duotone fa-wind-turbine splash" style={{ "--fa-primary-color": "#FFFFFF", "--fa-secondary-color": "#FFFFFF" }}></i>
                                    <div className="-mr-2 flex items-center md:hidden">
                                        <Popover.Button className="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                                            <span className="sr-only">Open main menu</span>
                                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>
                                <div className="hidden space-x-8 md:flex md:ml-10">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            target={item?.target}
                                            rel={item?.rel}
                                            className="text-base font-medium text-white hover:text-gray-300"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden md:flex md:items-center md:space-x-6">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="text-base font-medium text-white hover:text-gray-300">
                                    Log in
                                </button>
                                <button
                                    onClick={demoUser}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
                                >
                                    Demo User
                                </button>
                            </div>
                        </nav>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="duration-150 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top md:hidden">
                            <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                                <div className="px-5 pt-4 flex items-center justify-between">
                                    <div>
                                        <i className="fa-duotone fa-wind-turbine splash" style={{ "--fa-primary-color": "#FFFFFF", "--fa-secondary-color": "#FFFFFF" }}></i>
                                    </div>
                                    <div className="-mr-2">
                                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600">
                                            <span className="sr-only">Close menu</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>
                                <div className="pt-5 pb-6">
                                    <div className="px-2 space-y-1">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="mt-6 px-5">
                                        <button
                                            onClick={demoUser}
                                            className="block text-center w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700"
                                        >
                                            Try a demo
                                        </button>
                                    </div>
                                    <div className="mt-6 px-5">
                                        <p className="text-center text-base font-medium text-gray-500">
                                            Existing customer?{' '}
                                            <button onClick={() => setShowModal(true)} className="text-gray-900 hover:underline">
                                                Login
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>
                <main>
                    <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
                        <div className="mx-auto max-w-7xl lg:px-8">
                            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                                    <div className="lg:py-24">
                                        <a
                                            href="http://www.linkedin.com/in/brendan-downing"
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className="inline-flex items-center text-white bg-black rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                                        >
                                            <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full">
                                                Hire me
                                            </span>
                                            <span className="ml-4 text-sm">Visit my linked-in</span>
                                            <ChevronRightIcon className="ml-2 w-5 h-5 text-gray-500" aria-hidden="true" />
                                        </a>
                                        <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                                            <span className="block">A better way to</span>
                                            <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-cyan-400 sm:pb-5">
                                                manage jobsites
                                            </span>
                                        </h1>
                                        <p className="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                                            Keep your team, your jobsite, and your repairs ontrack with windVentory. No more wasted materials, or micommunications.

                                        </p>
                                        <div className="mt-10 sm:mt-12">

                                            <div className="sm:flex">
                                                <div className="min-w-0 flex-1">
                                                    <label htmlFor="email" className="sr-only">
                                                        Email address
                                                    </label>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="Enter your email"
                                                        className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                                                    />
                                                </div>
                                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                                    <button
                                                        type="submit"
                                                        onClick={(e) => setShowSignUpModal(true)}
                                                        className="block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                                                    >
                                                        Sign up
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                                    <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                                        <img
                                            className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                                            src="https://windventory.s3.amazonaws.com/turbine.gif"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature section with screenshot */}
                    <section id='product'>
                        <div className="relative bg-gray-50 pt-16 sm:pt-24 lg:pt-32">
                            <div className="mx-auto max-w-md px-4 text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
                                <div>
                                    <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">Real-time updates</h2>
                                    <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                                        Inventory constantly changing? No problem.
                                    </p>
                                    <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                                        Real time inventory updates with Socket.io keep you ahead of the curve and never wondering if you'll make it through your repair.
                                    </p>
                                </div>
                                <div className="mt-12 -mb-10 sm:-mb-24 lg:-mb-80">
                                    <img
                                        className="rounded-lg shadow-xl ring-1 ring-black ring-opacity-5"
                                        src="https://windventory.s3.amazonaws.com/Screen+Shot+2022-07-19+at+2.06.54+PM.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Feature section with grid */}
                    <section id="features" >
                        <div className="relative bg-white py-16 sm:py-24 lg:py-32">
                            <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                                <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">Find things faster</h2>
                                <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                                    Everything in one place
                                </p>
                                <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                                    Need the nearest grocery store, no problem. Where's the home depot in Kansas city? We've got you covered. Whats the weather like in Texas? Look no further.
                                </p>
                                <div className="mt-12">
                                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                        {features.map((feature) => (
                                            <div key={feature.name} className="pt-6">
                                                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                                                    <div className="-mt-6">
                                                        <div>
                                                            <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-md shadow-lg">
                                                                <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                                            </span>
                                                        </div>
                                                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                                                        <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Testimonial section */}
                    <section id="testimonials" >
                        <div className="pb-16 bg-gradient-to-r from-teal-500 to-cyan-600 lg:pb-0 lg:z-10 lg:relative">
                            <div className="lg:mx-auto sm:pt-5 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
                                <div className="relative lg:-my-8">
                                    {/* <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 z-10 bg-white lg:hidden" /> */}
                                    <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full">
                                        <div className="aspect-w-10 aspect-h-6 rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full">
                                            <img
                                                className="object-cover lg:h-full lg:w-full"
                                                src="https://windventory.s3.amazonaws.com/MeWind.jpeg"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
                                    <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">
                                        <blockquote>
                                            <div>
                                                <svg
                                                    className="h-12 w-12 text-white opacity-25"
                                                    fill="currentColor"
                                                    viewBox="0 0 32 32"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                                </svg>
                                                <p className="mt-6 text-2xl font-medium text-white">
                                                    windVentory is the app I wish I had while working in the Wind Industry.
                                                    This app would have saved me so much time on those long days hanging from a rope.
                                                    I made it, so there's no way that I am biased about how amazing and functional it is.
                                                    I love dragon fruit berry seltzer waters from Wegmann's.
                                                </p>
                                            </div>
                                            <footer className="mt-6">
                                                <p className="text-base font-medium text-white">Brendan Downing</p>
                                                <p className="text-base font-medium text-cyan-100">Creator of this application</p>
                                            </footer>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* CTA Section */}
                    {/* <div className="relative bg-gray-900">
                        <div className="relative h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
                            <img
                                className="w-full h-full object-cover"
                                src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&sat=-100"
                                alt=""
                            />
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 mix-blend-multiply"
                            />
                        </div>
                        <div className="relative mx-auto max-w-md px-4 py-12 sm:max-w-7xl sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32">
                            <div className="md:ml-auto md:w-1/2 md:pl-10">
                                <h2 className="text-base font-semibold uppercase tracking-wider text-gray-300">
                                    Award winning support
                                </h2>
                                <p className="mt-2 text-white text-3xl font-extrabold tracking-tight sm:text-4xl">We’re here to help</p>
                                <p className="mt-3 text-lg text-gray-300">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a
                                    scelerisque amet ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat quisque ut interdum
                                    tincidunt duis.
                                </p>
                                <div className="mt-8">
                                    <div className="inline-flex rounded-md shadow">
                                        <a
                                            href="#"
                                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
                                        >
                                            Visit the help center
                                            <ExternalLinkIcon className="-mr-1 ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </main>
                <footer className="bg-gray-50" aria-labelledby="footer-heading">
                    <h2 id="footer-heading" className="sr-only">
                        Footer
                    </h2>
                    <div className="max-w-md mx-auto pt-12 px-4 sm:max-w-7xl sm:px-6 lg:pt-16 lg:px-8">
                        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                            <div className="space-y-8 xl:col-span-1">
                                <i className="fa-duotone fa-wind-turbine splash" style={{ "--fa-primary-color": "#7efff5", "--fa-secondary-color": "#808080" }}></i>
                                <p className="text-gray-500 text-base">
                                    Making the world a better place one line at a time.
                                </p>
                                <div className="flex space-x-6">
                                    {footerNavigation.social.map((item) => (
                                        <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">{item.name}</span>
                                            <item.icon className="h-6 w-6" aria-hidden="true" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                                <div className="md:grid md:grid-cols-2 md:gap-8">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Frontend</h3>
                                        <ul role="list" className="mt-4 space-y-4">
                                            {footerNavigation.frontend.map((item) => (
                                                <li key={item.name}>
                                                    <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mt-12 md:mt-0">
                                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Backend</h3>
                                        <ul role="list" className="mt-4 space-y-4">
                                            {footerNavigation.backend.map((item) => (
                                                <li key={item.name}>
                                                    <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="md:grid md:grid-cols-2 md:gap-8">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Add ons</h3>
                                        <ul role="list" className="mt-4 space-y-4">
                                            {footerNavigation.addons.map((item) => (
                                                <li key={item.name}>
                                                    <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="mt-12 border-t border-gray-200 py-8">
                            <p className="text-base text-gray-400 xl:text-center">&copy; 2022 Brendan Downing, All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}