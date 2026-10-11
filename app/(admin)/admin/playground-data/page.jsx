import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabase/client';

export default function AdminPlaygroundData() {
  const [activeTab, setActiveTab] = useState('islands'); // 'islands' or 'blocks'
  const [islands, setIslands] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form states
  const [islandForm, setIslandForm] = useState({ id: '', name: '', sky: '', ground: '', landmarks: '' });
  const [blockForm, setBlockForm] = useState({ id: '', label: '', color: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'islands') {
        const { data, error } = await supabase.from('playground_islands').select('*').order('created_at', { ascending: true });
        if (error) throw error;
        setIslands(data || []);
      } else {
        const { data, error } = await supabase.from('playground_blocks').select('*').order('created_at', { ascending: true });
        if (error) throw error;
        setBlocks(data || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIslandSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let landmarksArray = [];
      try {
        landmarksArray = JSON.parse(islandForm.landmarks);
        if (!Array.isArray(landmarksArray)) throw new Error('Landmarks harus berupa array JSON');
      } catch (err) {
        throw new Error('Format landmarks tidak valid. Gunakan format JSON array, contoh: ["🏡", "🌳"]');
      }

      const payload = {
        name: islandForm.name,
        sky: islandForm.sky,
        ground: islandForm.ground,
        landmarks: landmarksArray
      };

      if (isEditing) {
        const { error } = await supabase.from('playground_islands').update(payload).eq('id', islandForm.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('playground_islands').insert([payload]);
        if (error) throw error;
      }
      resetForm();
      fetchData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        id: blockForm.id,
        label: blockForm.label,
        color: blockForm.color
      };

      if (isEditing) {
        const { error } = await supabase.from('playground_blocks').update({ label: payload.label, color: payload.color }).eq('id', payload.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('playground_blocks').insert([payload]);
        if (error) throw error;
      }
      resetForm();
      fetchData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus data ini?')) return;
    setLoading(true);
    try {
      if (activeTab === 'islands') {
        const { error } = await supabase.from('playground_islands').delete().eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('playground_blocks').delete().eq('id', id);
        if (error) throw error;
      }
      fetchData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditIsland = (island) => {
    setIslandForm({
      id: island.id,
      name: island.name,
      sky: island.sky,
      ground: island.ground,
      landmarks: JSON.stringify(island.landmarks)
    });
    setIsEditing(true);
  };

  const handleEditBlock = (block) => {
    setBlockForm({
      id: block.id,
      label: block.label,
      color: block.color
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setIslandForm({ id: '', name: '', sky: '', ground: '', landmarks: '' });
    setBlockForm({ id: '', label: '', color: '' });
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Manajemen Data Playground (Admin)</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${activeTab === 'islands' ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
          onClick={() => { setActiveTab('islands'); resetForm(); }}
        >
          Data Pulau (Islands)
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${activeTab === 'blocks' ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
          onClick={() => { setActiveTab('blocks'); resetForm(); }}
        >
          Data Balok (Blocks)
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-1 h-fit">
          <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Data' : 'Tambah Data Baru'}</h2>

          {activeTab === 'islands' ? (
            <form onSubmit={handleIslandSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Nama Pulau</label>
                <input type="text" required value={islandForm.name} onChange={(e) => setIslandForm({...islandForm, name: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border" placeholder="Cth: Desa Urutan" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Class Background Langit (Sky)</label>
                <input type="text" required value={islandForm.sky} onChange={(e) => setIslandForm({...islandForm, sky: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border" placeholder="Cth: from-sky-300 via-sky-100 to-amber-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Class Background Tanah (Ground)</label>
                <input type="text" required value={islandForm.ground} onChange={(e) => setIslandForm({...islandForm, ground: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border" placeholder="Cth: bg-emerald-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Landmarks (Format JSON Array)</label>
                <input type="text" required value={islandForm.landmarks} onChange={(e) => setIslandForm({...islandForm, landmarks: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border" placeholder='Cth: ["🏡", "🌳", "🌼", "🌳"]' />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={loading} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50">
                  {loading ? 'Menyimpan...' : (isEditing ? 'Update' : 'Simpan')}
                </button>
                {isEditing && (
                  <button type="button" onClick={resetForm} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-lg transition">
                    Batal
                  </button>
                )}
              </div>
            </form>
          ) : (
            <form onSubmit={handleBlockSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">ID Balok (Unik)</label>
                <input type="text" required value={blockForm.id} disabled={isEditing} onChange={(e) => setBlockForm({...blockForm, id: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border disabled:bg-slate-100" placeholder="Cth: move" />
                <p className="text-xs text-slate-500 mt-1">ID tidak bisa diubah setelah dibuat.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Label Balok</label>
                <input type="text" required value={blockForm.label} onChange={(e) => setBlockForm({...blockForm, label: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border" placeholder="Cth: ➔ MAJU 1 LANGKAH" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Class Warna (Tailwind)</label>
                <input type="text" required value={blockForm.color} onChange={(e) => setBlockForm({...blockForm, color: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border" placeholder="Cth: bg-teal-500 hover:bg-teal-600 text-white border-b-4 border-teal-700" />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={loading} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50">
                  {loading ? 'Menyimpan...' : (isEditing ? 'Update' : 'Simpan')}
                </button>
                {isEditing && (
                  <button type="button" onClick={resetForm} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-lg transition">
                    Batal
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        {/* List Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Daftar Data</h2>

          {loading && !isEditing ? (
            <div className="text-center py-8 text-slate-500">Memuat data...</div>
          ) : activeTab === 'islands' ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nama</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Desain</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Landmarks</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {islands.length === 0 && (
                    <tr><td colSpan="4" className="px-4 py-8 text-center text-slate-500">Belum ada data pulau</td></tr>
                  )}
                  {islands.map((island) => (
                    <tr key={island.id}>
                      <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-900">{island.name}</td>
                      <td className="px-4 py-3 text-xs">
                        <div className="mb-1"><strong>Sky:</strong> <span className="text-slate-500 truncate max-w-[150px] inline-block align-bottom">{island.sky}</span></div>
                        <div><strong>Ground:</strong> <span className="text-slate-500">{island.ground}</span></div>
                      </td>
                      <td className="px-4 py-3 text-xl">{Array.isArray(island.landmarks) ? island.landmarks.join(' ') : ''}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleEditIsland(island)} className="text-teal-600 hover:text-teal-900 mr-3">Edit</button>
                        <button onClick={() => handleDelete(island.id)} className="text-red-600 hover:text-red-900">Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Label & Preview</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {blocks.length === 0 && (
                    <tr><td colSpan="3" className="px-4 py-8 text-center text-slate-500">Belum ada data balok</td></tr>
                  )}
                  {blocks.map((block) => (
                    <tr key={block.id}>
                      <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-900">{block.id}</td>
                      <td className="px-4 py-3">
                        <div className="mb-2 font-medium">{block.label}</div>
                        <div className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-block ${block.color}`}>Preview Warna</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleEditBlock(block)} className="text-teal-600 hover:text-teal-900 mr-3">Edit</button>
                        <button onClick={() => handleDelete(block.id)} className="text-red-600 hover:text-red-900">Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
