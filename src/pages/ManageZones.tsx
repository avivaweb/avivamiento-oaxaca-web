
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const ManageZones = () => {
  const [zones, setZones] = useState([]);
  const [newZoneName, setNewZoneName] = useState('');
  const [editingZone, setEditingZone] = useState(null);
  const [pastors, setPastors] = useState([]);
  const [selectedPastor, setSelectedPastor] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchZones();
    fetchPastors();
  }, []);

  const fetchZones = async () => {
    const { data, error } = await supabase.from('zones').select('*, pastor:pastor_id(*)');
    if (error) {
      toast({ title: 'Error fetching zones', description: error.message, variant: 'destructive' });
    } else {
      setZones(data);
    }
  };

  const fetchPastors = async () => {
    // Assuming pastors are users with a 'pastor' role or similar
    // This logic might need adjustment based on your actual user/role setup
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name')
      .in('role', ['pastor', 'admin']); // Fetch users who can be zone pastors

    if (error) {
      toast({ title: 'Error fetching pastors', description: error.message, variant: 'destructive' });
    } else {
      setPastors(data);
    }
  };

  const handleAddZone = async (e) => {
    e.preventDefault();
    if (!newZoneName.trim()) {
      toast({ title: 'Zone name is required', variant: 'destructive' });
      return;
    }

    const { error } = await supabase.from('zones').insert([{ name: newZoneName, pastor_id: selectedPastor || null }]);
    if (error) {
      toast({ title: 'Error adding zone', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Zone added successfully!' });
      setNewZoneName('');
      setSelectedPastor('');
      fetchZones();
    }
  };

  const handleUpdateZone = async (zone) => {
    const { error } = await supabase.from('zones').update({ name: zone.name, pastor_id: zone.pastor_id }).eq('id', zone.id);
    if (error) {
      toast({ title: 'Error updating zone', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Zone updated successfully!' });
      setEditingZone(null);
      fetchZones();
    }
  };

  const handleDeleteZone = async (zoneId) => {
    // First, check if any cell groups are assigned to this zone
    const { data: cellGroups, error: checkError } = await supabase.from('cell_groups').select('id').eq('zone_id', zoneId).limit(1);

    if (checkError) {
        toast({ title: 'Error checking for cell groups', description: checkError.message, variant: 'destructive' });
        return;
    }

    if (cellGroups && cellGroups.length > 0) {
        toast({ title: 'Cannot delete zone', description: 'This zone is assigned to one or more cell groups. Please reassign them first.', variant: 'destructive' });
        return;
    }

    // If no groups are assigned, proceed with deletion
    const { error } = await supabase.from('zones').delete().eq('id', zoneId);
    if (error) {
      toast({ title: 'Error deleting zone', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Zone deleted successfully!' });
      fetchZones();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Manage Zones</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddZone} className="flex gap-2 mb-4">
            <Input
              type="text"
              placeholder="New zone name"
              value={newZoneName}
              onChange={(e) => setNewZoneName(e.target.value)}
              className="flex-grow"
            />
            <select
              value={selectedPastor}
              onChange={(e) => setSelectedPastor(e.target.value)}
              className="border rounded p-2"
            >
              <option value="">Assign Pastor (Optional)</option>
              {pastors.map(pastor => (
                <option key={pastor.id} value={pastor.id}>{pastor.full_name}</option>
              ))}
            </select>
            <Button type="submit">Add Zone</Button>
          </form>

          <div className="space-y-2">
            {zones.map(zone => (
              <div key={zone.id} className="flex items-center justify-between p-2 border rounded">
                {editingZone?.id === zone.id ? (
                  <>
                    <Input
                      type="text"
                      value={editingZone.name}
                      onChange={(e) => setEditingZone({ ...editingZone, name: e.target.value })}
                      className="flex-grow"
                    />
                    <select
                      value={editingZone.pastor_id || ''}
                      onChange={(e) => setEditingZone({ ...editingZone, pastor_id: e.target.value })}
                      className="border rounded p-2 mx-2"
                    >
                      <option value="">Assign Pastor (Optional)</option>
                      {pastors.map(pastor => (
                        <option key={pastor.id} value={pastor.id}>{pastor.full_name}</option>
                      ))}
                    </select>
                    <Button onClick={() => handleUpdateZone(editingZone)}>Save</Button>
                    <Button variant="ghost" onClick={() => setEditingZone(null)}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="font-semibold">{zone.name}</p>
                      <p className="text-sm text-gray-500">
                        Pastor: {zone.pastor ? zone.pastor.full_name : 'Not assigned'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setEditingZone({ ...zone })}>Edit</Button>
                      <Button variant="destructive" onClick={() => handleDeleteZone(zone.id)}>Delete</Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageZones;
