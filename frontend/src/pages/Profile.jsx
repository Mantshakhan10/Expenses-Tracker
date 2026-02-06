import { useState } from "react";
import { useApp } from "../context/AppContext";
import { User, Mail, Shield, Camera } from "lucide-react";
import { cn } from "../utils/cn";

export const Profile = () => {
  const { user } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+91 98765 43210",
  });

  return (
    <div className="flex flex-col md:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <aside className="w-full md:w-64 shrink-0">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-6">Profile</h2>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 card-shadow text-center">
          <div className="relative mx-auto h-24 w-24 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-inner">
            {user?.name.charAt(0)}
            <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[var(--card)] text-[var(--muted-foreground)] border border-[var(--border)] hover:text-[var(--primary)] transition-colors shadow-sm">
              <Camera size={14} />
            </button>
          </div>
          <h3 className="text-lg font-bold text-[var(--foreground)] truncate">{user?.name}</h3>
          <p className="text-sm text-[var(--muted-foreground)] truncate">{user?.email}</p>
        </div>
      </aside>

      <div className="flex-1 max-w-3xl">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] card-shadow overflow-hidden">
          <div className="border-b border-[var(--border)] px-6 py-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">Personal Information</h3>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={cn(
                "text-sm font-medium px-4 py-2 rounded-xl transition-colors",
                isEditing ? "bg-[var(--muted)] text-[var(--foreground)]" : "bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20"
              )}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
          
          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2 flex items-center gap-2">
                  <User size={16} /> Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="block w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-shadow"
                  />
                ) : (
                  <p className="text-[var(--foreground)] font-medium text-lg border border-transparent px-0 py-2.5">{formData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2 flex items-center gap-2">
                  <Mail size={16} /> Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="block w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-shadow"
                  />
                ) : (
                  <p className="text-[var(--foreground)] font-medium text-lg border border-transparent px-0 py-2.5">{formData.email}</p>
                )}
              </div>
            </div>

            <hr className="border-[var(--border)]" />

            <div>
              <h4 className="text-md font-semibold text-[var(--foreground)] flex items-center gap-2 mb-4">
                <Shield size={18} className="text-[var(--primary)]" /> Security Settings
              </h4>
              <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--muted)]/50 transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-[var(--foreground)]">Change Password</p>
                  <p className="text-sm text-[var(--muted-foreground)]">Ensure your account is using a long, random password.</p>
                </div>
                <button className="text-sm font-medium text-[var(--primary)]">Update</button>
              </div>
            </div>

            {isEditing && (
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-[var(--muted)] transition-colors"
                >
                  Discard
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2.5 rounded-xl bg-[var(--primary)] text-white font-medium shadow-md hover:bg-[var(--primary-hover)] transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
