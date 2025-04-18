import React from 'react';
import { Manga } from '@/api/paginate';

interface MangaDetailPageProps {
    manga: Manga;
}

const MangaDetailPage: React.FC<MangaDetailPageProps> = ({ manga }) => {
    const isVietnameseAvailable = manga.attributes.availableTranslatedLanguages.includes('vi');
    const coverArt = manga.relationships.find(rel => rel.type === 'cover_art');
    const coverArtFileName = coverArt?.attributes?.fileName;
    const coverImageUrl = coverArtFileName 
    ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArtFileName}`
    : '';
    const proxyImageUrl = `/api/image?url=${encodeURIComponent(coverImageUrl)}`;
    console.log(proxyImageUrl   )
    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 p-8">
            {/* Bìa Manga bên trái */}
            <div className="flex-none">
                <img src={proxyImageUrl} alt="Manga Cover" className="w-[200px] h-[300px] object-cover rounded-lg shadow-lg" />
            </div>      

            {/* Nội dung bên phải */}
            <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{manga.attributes.title.en}</h1>

                {/* Mô tả Manga */}
                <p className="text-lg text-gray-700 mb-6">{manga.attributes.description.en}</p>

                {/* Kiểm tra có bản dịch tiếng Việt */}
                {!isVietnameseAvailable && (
                    <p className="text-red-500 font-semibold mb-6">Truyện hiện tại chưa có Tiếng Việt</p>
                )}

                {/* Nếu có bản dịch, hiển thị ngôn ngữ */}
                {isVietnameseAvailable && (
                    <p className="text-green-500 font-semibold mb-6">Truyện đã có bản dịch Tiếng Việt</p>
                )}

                {/* Các thông tin khác có thể thêm vào */}
                <div className="flex justify-center gap-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Đọc Truyện</button>
                    <button className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-md">Thêm vào yêu thích</button>
                </div>
            </div>
        </div>
    );
};

export default MangaDetailPage;
