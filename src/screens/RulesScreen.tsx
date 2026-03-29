import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ScreenType } from '../App';

type Props = {
  onNavigate: (screen: ScreenType) => void;
};

const RulesScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[90vh] m-4">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex items-center justify-between text-white">
        <button
          onClick={() => onNavigate('HOME')}
          className="p-3 hover:bg-white/20 rounded-full transition-colors"
        >
          <ArrowLeft size={32} />
        </button>
        <h1 className="text-4xl font-bold tracking-wide">📖 LUẬT CHƠI</h1>
        <div className="w-14" /> {/* Spacer */}
      </div>

      <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8 text-slate-800 text-xl leading-relaxed">
        <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">🎯 Mục tiêu</h2>
          <p>Đội có điểm số cao nhất khi kết thúc 30 câu hỏi sẽ giành chiến thắng.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">🔄 Cách thức chơi</h2>
          <ul className="list-disc pl-8 space-y-2">
            <li>3 đội chơi luân phiên, mỗi lượt = 1 câu hỏi.</li>
            <li><strong>Trả lời ĐÚNG:</strong> +5đ và được quyền lật 2 thẻ.</li>
            <li><strong>Trả lời SAI:</strong> Không được lật thẻ, phải quay <strong>Vòng quay Hình phạt</strong>.</li>
          </ul>
        </section>

        <section className="bg-amber-50 p-6 rounded-2xl border border-amber-100 space-y-4">
          <h2 className="text-3xl font-bold text-amber-800">🃏 Luật lật thẻ ĐẶC BIỆT</h2>
          <p className="font-semibold text-red-600 text-2xl">⚠️ Thẻ lật lên sẽ KHÔNG BAO GIỜ úp lại! Giữ nguyên mặt ngửa vĩnh viễn.</p>
          <ul className="list-disc pl-8 space-y-2">
            <li>Khi lật 2 thẻ, nếu chúng <strong>KHỚP NHAU</strong>, đội sẽ nhận thưởng/phạt tương ứng.</li>
            <li>Nếu 2 thẻ <strong>KHÔNG KHỚP</strong>, MC sẽ kiểm tra xem có thẻ nào vừa lật khớp với các thẻ <strong>ĐÃ LẬT TỪ TRƯỚC</strong> hay không. Nếu có, vẫn được tính là khớp và nhận thưởng!</li>
          </ul>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center">
              <div className="text-4xl mb-2">🃏</div>
              <h3 className="font-bold text-blue-600">Thẻ thường</h3>
              <p>Cộng điểm theo vòng <br/> <em>(V1: 10đ, V2: 20đ, V3: 30đ)</em></p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center">
              <div className="text-4xl mb-2">💣</div>
              <h3 className="font-bold text-red-600">Bom</h3>
              <p><strong>-30đ</strong> <br/> <em>(Hiệu ứng nổ bom)</em></p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center">
              <div className="text-4xl mb-2">🎰</div>
              <h3 className="font-bold text-yellow-600">Nổ Hủ</h3>
              <p><strong>+60đ</strong> <br/> <em>(Hiệu ứng nổ hủ)</em></p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">⏱️ 3 Vòng thi</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
              <span className="bg-blue-100 text-blue-800 font-bold px-4 py-2 rounded-lg">Vòng 1</span>
              <div><strong>Khởi động:</strong> 15 giây/câu • Thẻ thường +10đ</div>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
              <span className="bg-orange-100 text-orange-800 font-bold px-4 py-2 rounded-lg">Vòng 2</span>
              <div><strong>Tăng tốc:</strong> 15 giây/câu • Thẻ thường +20đ</div>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
              <span className="bg-red-100 text-red-800 font-bold px-4 py-2 rounded-lg">Vòng 3</span>
              <div><strong>Sinh tử:</strong> 20 giây/câu • Thẻ thường +30đ</div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">🎡 Hình phạt</h2>
          <p>Khi trả lời sai, đội phải quay vòng quay hình phạt. Các ô có thể trúng:</p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full font-medium">Trừ điểm</span>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">Thoát phạt</span>
            <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-medium">Tặng điểm đội khác</span>
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">Câu hỏi phạt</span>
            <span className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full font-medium">Đoán nhạc</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RulesScreen;
