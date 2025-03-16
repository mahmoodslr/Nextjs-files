import { IGetArtiches } from "@/app/blogs/page";

function Article({ title, description }: IGetArtiches) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 transition-transform duration-300 hover:scale-105">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Article;
