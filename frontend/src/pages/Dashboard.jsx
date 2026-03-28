import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Users, CheckSquare, Target } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState({ leads: [], tasks: [], users: [] });
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }

        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5001/api/dashboard/data', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data);
        } catch (err) {
            setError('Failed to fetch dashboard data. Please try logging in again.');
            if (err.response && err.response.status === 401) {
                handleLogout();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case 'new': return <span className="badge badge-new">{status}</span>;
            case 'active': return <span className="badge badge-active">{status}</span>;
            case 'pending':
            case 'in progress': return <span className="badge badge-pending">{status}</span>;
            default: return <span className="badge badge-default">{status}</span>;
        }
    };

    if (loading) {
        return (
            <div className="page-wrapper">
                <div className="loader" style={{ width: '40px', height: '40px' }}></div>
            </div>
        );
    }

    return (
        <div className="app-wrapper">
            <nav className="navbar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 'bold', fontSize: '1.25rem' }}>
                    <div style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: '8px', display: 'flex' }}>
                        <LayoutDashboard size={20} />
                    </div>
                    Dashboard
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    {user && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>
                                {user.name.charAt(0)}
                            </div>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{user.name}</span>
                        </div>
                    )}
                    <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </nav>

            <main className="container animate-fade-in">
                <div style={{ marginBottom: '2rem' }}>
                    <h1>Welcome, {user?.name.split(' ')[0]}!</h1>
                    <p>Here is your current overview and statistics.</p>
                </div>

                {error && (
                    <div className="glass-card" style={{ borderColor: 'var(--error)', backgroundColor: 'rgba(239, 68, 68, 0.05)', marginBottom: '2rem' }}>
                        <p style={{ color: 'var(--error)' }}>{error}</p>
                    </div>
                )}

                {/* Stats Section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', padding: '1rem', borderRadius: '12px' }}>
                            <Target size={24} />
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Leads</h4>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{data.leads.length}</div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', padding: '1rem', borderRadius: '12px' }}>
                            <CheckSquare size={24} />
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pending Tasks</h4>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{data.tasks.filter(t => t.status !== 'Completed').length}</div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '1rem', borderRadius: '12px' }}>
                            <Users size={24} />
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Users</h4>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{data.users.filter(u => u.status === 'Active').length}</div>
                        </div>
                    </div>
                </div>

                {/* Data Tables / Lists Section */}
                <div className="dashboard-grid">
                    {/* Leads */}
                    <div className="glass-card">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Target size={18} /> Recent Leads
                        </h3>
                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {data.leads.length === 0 ? <p>No leads found.</p> : data.leads.map(lead => (
                                <div key={lead._id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <h4 style={{ fontSize: '1rem' }}>{lead.title}</h4>
                                        {getStatusBadge(lead.status)}
                                    </div>
                                    <p style={{ fontSize: '0.85rem' }}>{lead.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tasks */}
                    <div className="glass-card">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CheckSquare size={18} /> My Tasks
                        </h3>
                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {data.tasks.length === 0 ? <p>No tasks found.</p> : data.tasks.map(task => (
                                <div key={task._id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <h4 style={{ fontSize: '1rem' }}>{task.title}</h4>
                                        {getStatusBadge(task.status)}
                                    </div>
                                    <p style={{ fontSize: '0.85rem' }}>{task.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Users */}
                    <div className="glass-card">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Users size={18} /> Team Members
                        </h3>
                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {data.users.length === 0 ? <p>No users found.</p> : data.users.map(user => (
                                <div key={user._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                    <div>
                                        <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>{user.title}</h4>
                                        <p style={{ fontSize: '0.8rem' }}>{user.description}</p>
                                    </div>
                                    {getStatusBadge(user.status)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
