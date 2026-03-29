import { Card, CardType, GameConfig, MusicChallenge, Question, Team, WheelItem } from './types';

export const initialTeams: Team[] = [
  { id: 't1', name: 'Đội 1', color: '#3b82f6', score: 0 }, // Blue
  { id: 't2', name: 'Đội 2', color: '#ef4444', score: 0 }, // Red
  { id: 't3', name: 'Đội 3', color: '#22c55e', score: 0 }, // Green
];

export const initialQuestions: Question[] = [
  // Vòng 1
  { id: 'q1', round: 1, type: 'tf', text: 'Động lực là sự thôi thúc chủ quan dẫn đến hành động của con người nhằm đáp ứng những nhu cầu của họ.', answer: 'Đúng' },
  { id: 'q2', round: 1, type: 'mcq', text: 'Theo Frederick Winslow Taylor, yếu tố nào là động lực chính để nhân viên làm việc?', options: ['Quan hệ xã hội', 'Lương cao', 'Sự tôn trọng', 'Tự khẳng định bản thân'], answer: 'Lương cao' },
  { id: 'q3', round: 1, type: 'tf', text: 'Lý thuyết tâm lý xã hội (Hawthorne) cho rằng lương là yếu tố DUY NHẤT quyết định động lực làm việc.', answer: 'Sai' },
  { id: 'q4', round: 1, type: 'mcq', text: 'Tháp nhu cầu Maslow gồm bao nhiêu bậc?', options: ['3', '4', '5', '6'], answer: '5' },
  { id: 'q5', round: 1, type: 'text', text: 'Theo Maslow, nhu cầu bậc thấp nhất của con người là nhu cầu gì?', answer: 'Sinh lý' },
  { id: 'q6', round: 1, type: 'mcq', text: 'Thuyết ERG của Clayton Alderfer gồm mấy loại nhu cầu?', options: ['2', '3', '4', '5'], answer: '3' },
  { id: 'q7', round: 1, type: 'tf', text: 'Thuyết ERG cho rằng con người chỉ có thể theo đuổi MỘT loại nhu cầu tại một thời điểm.', answer: 'Sai' },
  { id: 'q8', round: 1, type: 'mcq', text: 'Theo David McClelland, ba nhu cầu cơ bản:', options: ['Sinh lý, an toàn, xã hội', 'Thành đạt, liên minh, quyền lực', 'Tồn tại, quan hệ, phát triển', 'Lương, thưởng, môi trường'], answer: 'Thành đạt, liên minh, quyền lực' },
  { id: 'q9', round: 1, type: 'mcq', text: 'Theo mục 6.4, có bao nhiêu yếu tố chính ảnh hưởng đến hiệu quả lãnh đạo?', options: ['2', '3', '4', '5'], answer: '4' },
  { id: 'q10', round: 1, type: 'tf', text: 'Mọi nhà lãnh đạo đều đạt hiệu quả cao nếu có ý chí, dù không nhận định đúng tình huống.', answer: 'Sai' },
  
  // Vòng 2
  { id: 'q11', round: 2, type: 'text', text: 'Thuyết hai yếu tố Herzberg gồm yếu tố gì và yếu tố gì?', answer: 'Duy trì và Động viên' },
  { id: 'q12', round: 2, type: 'tf', text: 'Theo Herzberg, lương bổng và điều kiện làm việc là yếu tố ĐỘNG VIÊN quan trọng nhất.', answer: 'Sai' },
  { id: 'q13', round: 2, type: 'mcq', text: 'Thuyết mong đợi của Victor H. Vroom được xây dựng năm nào?', options: ['1954', '1960', '1964', '1975'], answer: '1964' },
  { id: 'q14', round: 2, type: 'tf', text: 'Theo thuyết công bằng Adams, nếu cảm thấy không công bằng, năng suất lao động sẽ giảm.', answer: 'Đúng' },
  { id: 'q15', round: 2, type: 'mcq', text: 'Công thức "Động lực = Sức hấp dẫn × Niềm tin" thuộc thuyết nào?', options: ['Maslow', 'Herzberg', 'Mong đợi Vroom', 'Công bằng Adams'], answer: 'Mong đợi Vroom' },
  { id: 'q16', round: 2, type: 'text', text: 'Yếu tố đầu tiên ảnh hưởng đến hiệu quả lãnh đạo (mục 6.4.1) là gì?', answer: 'Nhận định đúng' },
  { id: 'q17', round: 2, type: 'mcq', text: 'Kinh nghiệm ảnh hưởng đến lãnh đạo theo hướng nào?', options: ['Chỉ có giá trị với lãnh đạo trẻ', 'Biết chọn phương pháp phù hợp', 'Thay thế hoàn toàn nhận định đúng', 'Không quan trọng bằng học vấn'], answer: 'Biết chọn phương pháp phù hợp' },
  { id: 'q18', round: 2, type: 'tf', text: 'Nhà lãnh đạo nên dùng CÙNG MỘT phong cách cho tất cả nhân viên.', answer: 'Sai' },
  { id: 'q19', round: 2, type: 'mcq', text: 'Trình độ cao của nhân viên giúp lãnh đạo:', options: ['Kiểm soát chặt hơn', 'Áp dụng phong cách dân chủ', 'Không cần quan tâm nhân viên', 'Dùng phong cách độc đoán'], answer: 'Áp dụng phong cách dân chủ' },
  { id: 'q20', round: 2, type: 'text', text: 'Yếu tố thứ 4 ảnh hưởng đến hiệu quả lãnh đạo là quan hệ với ai?', answer: 'Đồng nghiệp' },

  // Vòng 3
  { id: 'q21', round: 3, type: 'mcq', text: 'Điểm khác biệt cơ bản giữa thuyết ERG và Maslow:', options: ['ERG có 5 bậc', 'ERG cho phép đồng thời theo đuổi nhiều nhu cầu', 'ERG chỉ cho nhà quản trị', 'ERG không đề cập sinh lý'], answer: 'ERG cho phép đồng thời theo đuổi nhiều nhu cầu' },
  { id: 'q22', round: 3, type: 'text', text: 'Lý thuyết cổ điển về động lực gắn với Frederick Winslow ai?', answer: 'Taylor' },
  { id: 'q23', round: 3, type: 'tf', text: 'Thuyết Porter-Lawler: phần thưởng hợp lý → thỏa mãn → thực hiện công việc tốt hơn.', answer: 'Đúng' },
  { id: 'q24', round: 3, type: 'mcq', text: 'Theo Porter-Lawler, yếu tố nào KHÔNG thuộc mô hình?', options: ['Khả năng thực hiện nhiệm vụ', 'Nhận thức về nhiệm vụ', 'Phần thưởng', 'Phong cách lãnh đạo độc đoán'], answer: 'Phong cách lãnh đạo độc đoán' },
  { id: 'q25', round: 3, type: 'mcq', text: 'Thuyết nào nhấn mạnh so sánh "đóng góp" và "lợi ích nhận về"?', options: ['Maslow', 'Vroom', 'Adams', 'Taylor'], answer: 'Adams' },
  { id: 'q26', round: 3, type: 'mcq', text: 'Quản đốc mới, nhân viên trình độ thấp. Nên dùng phong cách nào?', options: ['Tự do', 'Dân chủ', 'Giám sát chặt, hướng dẫn cụ thể', 'Không quản lý'], answer: 'Giám sát chặt, hướng dẫn cụ thể' },
  { id: 'q27', round: 3, type: 'tf', text: 'Thuyết Maslow và ERG đều phân chia nhu cầu thành 5 bậc.', answer: 'Sai' },
  { id: 'q28', round: 3, type: 'mcq', text: 'Nhân viên thấy lương thấp hơn đồng nghiệp → giảm nỗ lực. Thuyết nào?', options: ['Maslow', 'Herzberg', 'Công bằng Adams', 'Mong đợi Vroom'], answer: 'Công bằng Adams' },
  { id: 'q29', round: 3, type: 'text', text: 'Porter-Lawler: Giá trị phần thưởng → ____ → Nỗ lực → Kết quả.', answer: 'Khả năng thực hiện nhiệm vụ' },
  { id: 'q30', round: 3, type: 'mcq', text: 'Công ty giải thể liên tục, bỏ mặc nhân viên. Vi phạm yếu tố nào?', options: ['Thiếu kinh nghiệm', 'Thiếu nhận định đúng và quan hệ đồng nghiệp', 'Trình độ nhân viên thấp', 'Không vi phạm'], answer: 'Thiếu nhận định đúng và quan hệ đồng nghiệp' },
];

export const initialRewardWheel: WheelItem[] = [
  { id: 'rw1', name: '+15đ', type: 'points', value: 15, color: '#10b981', weight: 1 },
  { id: 'rw2', name: '+10đ', type: 'points', value: 10, color: '#3b82f6', weight: 1 },
  { id: 'rw3', name: 'Rất tiếc!', type: 'none', value: 0, color: '#94a3b8', weight: 1 },
  { id: 'rw4', name: '+20đ', type: 'points', value: 20, color: '#8b5cf6', weight: 1 },
  { id: 'rw5', name: 'Thử thách', type: 'challenge', value: 15, color: '#f59e0b', weight: 1 },
  { id: 'rw6', name: '+5đ', type: 'points', value: 5, color: '#06b6d4', weight: 1 },
  { id: 'rw7', name: 'Rất tiếc!', type: 'none', value: 0, color: '#94a3b8', weight: 1 },
  { id: 'rw8', name: '+25đ', type: 'points', value: 25, color: '#ec4899', weight: 1 },
];

export const initialPenaltyWheel: WheelItem[] = [
  { id: 'pw1', name: '-10đ', type: 'points', value: -10, color: '#ef4444', weight: 1 },
  { id: 'pw2', name: 'Thoát phạt!', type: 'none', value: 0, color: '#10b981', weight: 1 },
  { id: 'pw3', name: 'Tặng 10đ', type: 'give', value: 10, color: '#f59e0b', weight: 1 },
  { id: 'pw4', name: '-5đ', type: 'points', value: -5, color: '#f97316', weight: 1 },
  { id: 'pw5', name: 'Thử thách', type: 'challenge', value: -15, color: '#8b5cf6', weight: 1 },
  { id: 'pw6', name: 'Thoát!', type: 'none', value: 0, color: '#22c55e', weight: 1 },
  { id: 'pw7', name: '🎵 Đoán nhạc', type: 'music', value: -10, color: '#ec4899', weight: 1 },
  { id: 'pw8', name: 'Tặng 15đ', type: 'give', value: 15, color: '#eab308', weight: 1 },
];

export const initialMusicChallenges: MusicChallenge[] = [
  { id: 'm1', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', answer: 'Bài hát 1' },
  { id: 'm2', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', answer: 'Bài hát 2' },
];

const cardPairs = [
  { pairId: 'maslow', emoji: '🏔️', name: 'Maslow', type: 'normal' as CardType },
  { pairId: 'herzberg', emoji: '⚖️', name: 'Herzberg', type: 'normal' as CardType },
  { pairId: 'vroom', emoji: '🎯', name: 'Vroom', type: 'normal' as CardType },
  { pairId: 'adams', emoji: '⚡', name: 'Adams', type: 'normal' as CardType },
  { pairId: 'taylor', emoji: '🏭', name: 'Taylor', type: 'normal' as CardType },
  { pairId: 'erg', emoji: '🔄', name: 'ERG', type: 'normal' as CardType },
  { pairId: 'jackpot1', emoji: '🎰', name: 'Nổ Hủ', type: 'jackpot' as CardType },
  { pairId: 'jackpot2', emoji: '🎰', name: 'Nổ Hủ', type: 'jackpot' as CardType },
  { pairId: 'jackpot3', emoji: '🎰', name: 'Nổ Hủ', type: 'jackpot' as CardType },
  { pairId: 'bomb1', emoji: '💣', name: 'Bom', type: 'bomb' as CardType },
  { pairId: 'bomb2', emoji: '💣', name: 'Bom', type: 'bomb' as CardType },
  { pairId: 'bomb3', emoji: '💣', name: 'Bom', type: 'bomb' as CardType },
];

export const generateCards = (): Card[] => {
  const cards: Card[] = [];
  cardPairs.forEach((pair) => {
    cards.push({ ...pair, id: `${pair.pairId}-1`, isFlipped: false, isMatched: false });
    cards.push({ ...pair, id: `${pair.pairId}-2`, isFlipped: false, isMatched: false });
  });
  // Shuffle
  return cards.sort(() => Math.random() - 0.5);
};

export const initialConfig: GameConfig = {
  teams: initialTeams,
  questions: initialQuestions,
  rewardWheel: initialRewardWheel,
  penaltyWheel: initialPenaltyWheel,
  musicChallenges: initialMusicChallenges,
  bgMusicUrl: '',
};
