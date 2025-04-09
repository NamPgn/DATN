import { Card } from "antd";
import TailwindComponent from "../../../../components/Tailwind/TailwinComponent";

const SelectedImages = ({ selectImage, selectOneImage }: any) => {
    return (
        <TailwindComponent>
            <div className="mb-4">
                {selectImage.length > 0 && (
                    <Card title="Ảnh đã chọn">
                        <div className="flex flex-wrap gap-4">
                            {selectImage.map((image: any) => (
                                <div key={image.id} className="relative">
                                    <img
                                        src={image.url}
                                        alt="selected"
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />
                                    {selectOneImage?.id === image.id && (
                                        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>
                )}
            </div>
        </TailwindComponent>
    );
};

export default SelectedImages; 