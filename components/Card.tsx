export default function Card({
  title,
  image,
}: {
  title: string
  image: string
}) {
  return (
    <div className="max-w-xs overflow-hidden rounded-md shadow-lg hover:scale-105 transition duration-300 ease-in-out">
      <div className=" rounded-lg relative">
        <img
          className="w-full h-96"
          src={image}
          alt="Sunset in the mountains"
        />
        <div className="px-5 pt-4 pb-2 absolute bottom-0 right-0">
          <span className="font-sans-kr inline-block bg-white rounded-lg px-3 py-1 text-xs text-gray-600 mr-2 mb-3">
            #LoveKong
          </span>
          <span className="font-sans-kr inline-block bg-white rounded-lg px-3 py-1 text-xs text-gray-600 mb-3">
            #{title}
          </span>
        </div>
        {/* <div className="px-5 py-4 pb-2 absolute top-0 left-0">
                <div className="font-sans-kr text-lg mb-2 text-white">{title}</div>
            </div> */}
      </div>
    </div>
  )
}
