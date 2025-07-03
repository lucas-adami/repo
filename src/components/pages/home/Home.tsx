import { useNavigate } from "react-router-dom"

export const Home = () => {
    const navigate = useNavigate()


    return (
        <div className="w-2/3">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-orange-500 " style={{ WebkitTextStroke: "1px white" }}
                >Welcome!</h1>
                <img src="/aws.png" alt="bucket" className="rounded-full w-24" />
            </div>
            <p className="font-semibold text-lg">Choose an option to interact with AWS's virtual machines ☁️☁️</p>
            <div className="flex  gap-4 mt-10 text-black">
                {/* Card padrão */}
                <div
                    className="flex flex-col items-center p-4 rounded-lg bg-white shadow cursor-pointer hover:bg-gray-300 transition duration-300 ease-in-out w-1/3"
                    onClick={() => navigate("/users")}
                >
                    <img src="/mongo.png" alt="mongo" className="w-60 h-32 object-contain mb-2" />
                    <p className="font-semibold text-center text-lg">EC2-api and EC2-mongodb</p>
                </div>

                <div
                    className="flex flex-col items-center p-4 rounded-lg bg-white shadow cursor-pointer hover:bg-gray-300 transition duration-300 ease-in-out w-1/3"
                    onClick={() => navigate("/buckets")}
                >
                    <img src="/s3.png" alt="bucket" className=" h-32 object-contain mb-2 " />
                    <p className="font-semibold text-center text-lg">EC2-api and aws-S3-bucket</p>
                </div>

                <div
                    className="flex flex-col items-center p-4 rounded-lg bg-white shadow cursor-pointer hover:bg-gray-300 transition duration-300 ease-in-out w-1/3"
                    onClick={() => navigate("/products")}
                >
                    <img src="/mysql.png" alt="bucket" className=" h-32 object-contain mb-2" />
                    <p className="font-semibold text-center text-lg">EC2-api and RDS-MySQL</p>
                </div>
            </div>

        </div>
    )
}