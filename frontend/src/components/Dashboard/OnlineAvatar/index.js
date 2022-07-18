export default function OnlineAvatar({ image }) {
    return (
        <>
            <div>
                <span className="inline-block relative">
                    <img
                        className="h-16 w-16 rounded-full"
                        src={image}
                        alt=""
                    />
                    <span className="absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 block border-2 border-white rounded-full">
                        <span className="block h-4 w-4 rounded-full bg-red-400" />
                    </span>
                </span>
            </div>
        </>
    )
}