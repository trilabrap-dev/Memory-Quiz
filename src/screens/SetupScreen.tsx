import React, { useState } from 'react';
import { ArrowLeft, Save, Users, HelpCircle, Gift, AlertTriangle, Lightbulb, Music, Settings } from 'lucide-react';
import { useGame } from '../store/GameContext';
import { ScreenType } from '../App';
import { GameConfig } from '../types';

type Props = {
  onNavigate: (screen: ScreenType) => void;
};

const SetupScreen: React.FC<Props> = ({ onNavigate }) => {
  const { config, setConfig } = useGame();
  const [localConfig, setLocalConfig] = useState<GameConfig>(JSON.parse(JSON.stringify(config)));
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleSave = () => {
    setConfig(localConfig);
    onNavigate('HOME');
  };

  const tabs = [
    { id: 0, name: 'Đội chơi', icon: <Users size={20} /> },
    { id: 1, name: 'Câu hỏi', icon: <HelpCircle size={20} /> },
    { id: 2, name: 'Vòng quay Thưởng', icon: <Gift size={20} /> },
    { id: 3, name: 'Vòng quay Phạt', icon: <AlertTriangle size={20} /> },
    { id: 5, name: 'Đoán nhạc', icon: <Music size={20} /> },
    { id: 6, name: 'Cài đặt chung', icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[90vh] m-4">
      <div className="bg-slate-800 p-4 flex items-center justify-between text-white">
        <button
          onClick={() => onNavigate('HOME')}
          className="p-2 hover:bg-white/20 rounded-full transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={24} />
          <span className="font-semibold">Trở về</span>
        </button>
        <h1 className="text-2xl font-bold tracking-wide">⚙️ CÀI ĐẶT (MC)</h1>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg"
        >
          <Save size={20} />
          LƯU
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col p-4 gap-2 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-left ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-white">
          {activeTab === 0 && <TeamsTab config={localConfig} setConfig={setLocalConfig} />}
          {activeTab === 1 && <QuestionsTab config={localConfig} setConfig={setLocalConfig} />}
          {activeTab === 2 && <WheelTab config={localConfig} setConfig={setLocalConfig} type="reward" />}
          {activeTab === 3 && <WheelTab config={localConfig} setConfig={setLocalConfig} type="penalty" />}
          {activeTab === 5 && <MusicTab config={localConfig} setConfig={setLocalConfig} />}
          {activeTab === 6 && <SettingsTab config={localConfig} setConfig={setLocalConfig} />}
        </div>
      </div>
    </div>
  );
};

// --- Subcomponents for Tabs ---

const TeamsTab = ({ config, setConfig }: { config: GameConfig; setConfig: any }) => {
  const updateTeam = (idx: number, field: string, value: string) => {
    const newTeams = [...config.teams];
    newTeams[idx] = { ...newTeams[idx], [field]: value };
    setConfig({ ...config, teams: newTeams });
  };

  const addTeam = () => {
    if (config.teams.length >= 6) return;
    const newTeam = { id: `t${Date.now()}`, name: `Đội ${config.teams.length + 1}`, color: '#000000', score: 0 };
    setConfig({ ...config, teams: [...config.teams, newTeam] });
  };

  const removeTeam = (idx: number) => {
    if (config.teams.length <= 2) return; // Min 2 teams
    const newTeams = config.teams.filter((_, i) => i !== idx);
    setConfig({ ...config, teams: newTeams });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Danh sách Đội chơi</h2>
        <button onClick={addTeam} disabled={config.teams.length >= 6} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold disabled:opacity-50">
          + Thêm đội
        </button>
      </div>
      <div className="space-y-4">
        {config.teams.map((team, idx) => (
          <div key={team.id} className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50">
            <input
              type="color"
              value={team.color}
              onChange={(e) => updateTeam(idx, 'color', e.target.value)}
              className="w-12 h-12 rounded cursor-pointer"
            />
            <input
              type="text"
              value={team.name}
              onChange={(e) => updateTeam(idx, 'name', e.target.value)}
              className="flex-1 p-3 border border-slate-300 rounded-lg text-lg font-semibold"
              placeholder="Tên đội"
            />
            <button onClick={() => removeTeam(idx)} disabled={config.teams.length <= 2} className="p-3 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50">
              Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuestionsTab = ({ config, setConfig }: { config: GameConfig; setConfig: any }) => {
  // Simplified for brevity, normally you'd have a full editor
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Danh sách Câu hỏi ({config.questions.length})</h2>
      <p className="text-slate-500">MC có thể chỉnh sửa trực tiếp nội dung câu hỏi tại đây.</p>
      <div className="space-y-6">
        {config.questions.map((q, idx) => (
          <div key={q.id} className="p-6 border border-slate-200 rounded-2xl bg-slate-50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg text-slate-700">Câu {idx + 1} - Vòng {q.round}</span>
              <select
                value={q.type}
                onChange={(e) => {
                  const newQ = [...config.questions];
                  newQ[idx].type = e.target.value as any;
                  setConfig({ ...config, questions: newQ });
                }}
                className="p-2 border rounded-lg bg-white"
              >
                <option value="mcq">Trắc nghiệm</option>
                <option value="tf">Đúng/Sai</option>
                <option value="text">Tự luận</option>
              </select>
            </div>
            <textarea
              value={q.text}
              onChange={(e) => {
                const newQ = [...config.questions];
                newQ[idx].text = e.target.value;
                setConfig({ ...config, questions: newQ });
              }}
              className="w-full p-3 border border-slate-300 rounded-lg min-h-[80px]"
              placeholder="Nội dung câu hỏi"
            />
            {q.type === 'mcq' && (
              <div className="grid grid-cols-2 gap-2">
                {q.options?.map((opt, optIdx) => (
                  <div key={optIdx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`q-${q.id}-ans`}
                      checked={q.answer === opt}
                      onChange={() => {
                        const newQ = [...config.questions];
                        newQ[idx].answer = opt;
                        setConfig({ ...config, questions: newQ });
                      }}
                    />
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const newQ = [...config.questions];
                        if (newQ[idx].options) {
                          newQ[idx].options![optIdx] = e.target.value;
                          if (q.answer === opt) newQ[idx].answer = e.target.value;
                        }
                        setConfig({ ...config, questions: newQ });
                      }}
                      className="flex-1 p-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
            {q.type === 'tf' && (
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name={`q-${q.id}-ans`} checked={q.answer === 'Đúng'} onChange={() => {
                    const newQ = [...config.questions];
                    newQ[idx].answer = 'Đúng';
                    setConfig({ ...config, questions: newQ });
                  }} /> Đúng
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name={`q-${q.id}-ans`} checked={q.answer === 'Sai'} onChange={() => {
                    const newQ = [...config.questions];
                    newQ[idx].answer = 'Sai';
                    setConfig({ ...config, questions: newQ });
                  }} /> Sai
                </label>
              </div>
            )}
            {q.type === 'text' && (
              <input
                type="text"
                value={q.answer}
                onChange={(e) => {
                  const newQ = [...config.questions];
                  newQ[idx].answer = e.target.value;
                  setConfig({ ...config, questions: newQ });
                }}
                className="w-full p-3 border border-slate-300 rounded-lg bg-green-50"
                placeholder="Đáp án đúng"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const WheelTab = ({ config, setConfig, type }: { config: GameConfig; setConfig: any; type: 'reward' | 'penalty' }) => {
  const items = type === 'reward' ? config.rewardWheel : config.penaltyWheel;
  
  const updateItem = (idx: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[idx] = { ...newItems[idx], [field]: value };
    setConfig({ ...config, [type === 'reward' ? 'rewardWheel' : 'penaltyWheel']: newItems });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">
        {type === 'reward' ? 'Vòng quay Thưởng' : 'Vòng quay Phạt'}
      </h2>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={item.id} className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50">
            <input
              type="color"
              value={item.color}
              onChange={(e) => updateItem(idx, 'color', e.target.value)}
              className="w-10 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(idx, 'name', e.target.value)}
              className="flex-1 p-2 border border-slate-300 rounded-lg font-semibold"
              placeholder="Tên ô"
            />
            <select
              value={item.type}
              onChange={(e) => updateItem(idx, 'type', e.target.value)}
              className="p-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="points">Điểm (+/-)</option>
              <option value="none">Không có gì</option>
              <option value="challenge">Thử thách</option>
              {type === 'penalty' && <option value="give">Tặng điểm</option>}
              {type === 'penalty' && <option value="music">Đoán nhạc</option>}
            </select>
            {item.type === 'points' || item.type === 'give' ? (
              <input
                type="number"
                value={item.value}
                onChange={(e) => updateItem(idx, 'value', parseInt(e.target.value) || 0)}
                className="w-24 p-2 border border-slate-300 rounded-lg text-center"
                placeholder="Giá trị"
              />
            ) : <div className="w-24"></div>}
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-600">Tỉ lệ:</span>
              <input
                type="number"
                value={item.weight}
                onChange={(e) => updateItem(idx, 'weight', Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 p-2 border border-slate-300 rounded-lg text-center"
                min="1"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MusicTab = ({ config, setConfig }: { config: GameConfig; setConfig: any }) => {
  const addMusic = () => {
    const newMusic = { id: `m${Date.now()}`, audioUrl: '', answer: '' };
    setConfig({ ...config, musicChallenges: [...config.musicChallenges, newMusic] });
  };

  const removeMusic = (idx: number) => {
    const newM = config.musicChallenges.filter((_, i) => i !== idx);
    setConfig({ ...config, musicChallenges: newM });
  };

  const handleFileUpload = (idx: number, file: File) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('File quá lớn! Vui lòng chọn file dưới 2MB để tránh lỗi lưu trữ, hoặc dùng Link URL.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const newM = [...config.musicChallenges];
      newM[idx].audioUrl = e.target?.result as string;
      setConfig({ ...config, musicChallenges: newM });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Đoán nhạc</h2>
        <button onClick={addMusic} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold">
          + Thêm bài hát
        </button>
      </div>
      <p className="text-slate-500 text-sm">Bạn có thể dán link nhạc (URL) hoặc tải lên file mp3 (Khuyến nghị &lt; 2MB).</p>
      <div className="space-y-4">
        {config.musicChallenges.map((m, idx) => (
          <div key={m.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50">
            <div className="flex-1 space-y-3 w-full">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={m.audioUrl}
                  onChange={(e) => {
                    const newM = [...config.musicChallenges];
                    newM[idx].audioUrl = e.target.value;
                    setConfig({ ...config, musicChallenges: newM });
                  }}
                  className="flex-1 p-2 border border-slate-300 rounded-lg"
                  placeholder="Link Audio (URL) hoặc Tải file lên ->"
                />
                <label className="cursor-pointer px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-semibold whitespace-nowrap">
                  Tải file
                  <input 
                    type="file" 
                    accept="audio/*" 
                    className="hidden" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(idx, e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>
              {m.audioUrl && m.audioUrl.startsWith('data:audio') && (
                <div className="text-xs text-green-600 font-semibold">✓ Đã tải lên tệp âm thanh cục bộ</div>
              )}
              <input
                type="text"
                value={m.answer}
                onChange={(e) => {
                  const newM = [...config.musicChallenges];
                  newM[idx].answer = e.target.value;
                  setConfig({ ...config, musicChallenges: newM });
                }}
                className="w-full p-2 border border-slate-300 rounded-lg bg-green-50"
                placeholder="Đáp án"
              />
            </div>
            <button onClick={() => removeMusic(idx)} className="p-3 text-red-500 hover:bg-red-50 rounded-lg whitespace-nowrap">
              Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsTab = ({ config, setConfig }: { config: GameConfig; setConfig: any }) => {
  const handleFileUpload = (file: File) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('File quá lớn! Vui lòng chọn file dưới 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setConfig({ ...config, bgMusicUrl: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Cài đặt chung</h2>
      <div className="p-6 border border-slate-200 rounded-2xl bg-slate-50 space-y-4">
        <h3 className="font-bold text-lg text-slate-700">Nhạc nền (Background Music)</h3>
        <p className="text-slate-500 text-sm">Nhạc nền sẽ phát xuyên suốt trò chơi. Bạn có thể dán link nhạc (URL) hoặc tải lên file mp3.</p>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <input
            type="text"
            value={config.bgMusicUrl || ''}
            onChange={(e) => setConfig({ ...config, bgMusicUrl: e.target.value })}
            className="flex-1 p-3 border border-slate-300 rounded-lg w-full"
            placeholder="Link Audio (URL) hoặc Tải file lên ->"
          />
          <label className="cursor-pointer px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-semibold whitespace-nowrap">
            Tải file
            <input 
              type="file" 
              accept="audio/*" 
              className="hidden" 
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />
          </label>
        </div>
        {config.bgMusicUrl && config.bgMusicUrl.startsWith('data:audio') && (
          <div className="text-sm text-green-600 font-semibold">✓ Đã tải lên tệp âm thanh cục bộ</div>
        )}
        {config.bgMusicUrl && (
          <audio controls src={config.bgMusicUrl} className="w-full mt-4" />
        )}
      </div>
    </div>
  );
};

export default SetupScreen;
