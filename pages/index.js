import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [switchState, setSwitchState] = useState(false);
  const [ledCommand, setLedCommand] = useState(false);

  // スイッチ状態を取得（ESP32 → Supabase → Web）
  const fetchSwitchStatus = async () => {
    const { data, error } = await supabase
      .from('device_status')
      .select('switch_state')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (data) {
      setSwitchState(data.switch_state);
    }
  };

  // LED制御コマンドを送信（Web → Supabase → ESP32）
  const toggleLED = async () => {
    const { error } = await supabase.from('device_command').insert([
      {
        led_command: !ledCommand
      }
    ]);

    if (!error) {
      setLedCommand(!ledCommand);
    } else {
      console.error('❌ Supabase insert failed:', error.message);
    }
  };

  // 最新のLEDコマンドも取得して表示に反映
  const fetchLedCommand = async () => {
    const { data, error } = await supabase
      .from('device_command')
      .select('led_command')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (data) {
      setLedCommand(data.led_command);
    }
  };

  useEffect(() => {
    fetchSwitchStatus();
    fetchLedCommand();
    const interval = setInterval(() => {
      fetchSwitchStatus();
      fetchLedCommand();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>ESP32 Control Panel</h1>
      <p>🪛 スイッチの状態：{switchState ? 'OFF' : 'ON'}</p>
      <p>💡 現在のLED状態：{ledCommand ? 'ON' : 'OFF'}</p>
      <button onClick={toggleLED}>
        💡 LEDを {ledCommand ? 'OFFにする' : 'ONにする'}
      </button>
    </main>
  );
}
