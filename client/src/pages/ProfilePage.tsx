import { Camera, Mail, User } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import { useState } from "react";

const ProfilePage = () => {
  const { authUser, isUploadingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.files) {
      return;
    }

    const file = e.target.files[0];
    if (!file) {
      return;
    }

    try {
      // Convert file to base64
      const base64Image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          if (reader.result) {
            resolve(reader.result.toString());
          } else {
            reject("Failed to read file");
          }
        };

        reader.onerror = () => {
          reject("Error occurred while reading file");
        };
      });

      // Update state and send data to backend
      setSelectedImage(base64Image);
      updateProfile({ profilePic: base64Image });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-blue-950/40 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImage || authUser.avatar || "/image.png"}
                alt="profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUploadingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploadingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUploadingProfile
                ? "uploading...."
                : "click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="size-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser.username}
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="size-4" />
                Email
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser.email}
              </p>
            </div>
          </div>
          <div className="mt-6 bg-blue-950/40 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>18th August</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
