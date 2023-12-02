import React, { useState, useEffect } from 'react';
import { useFormLogic } from '../../../hooks/useFormLogic';
import { updateProfileSchema } from '../../../validation/validationSchemas';
import { Input } from '../../common/Input';
import { FormLayout } from '../../common/FormLayout';
import { useFetchProfile } from '../../../hooks/useFetchProfile'; 
import useUpdateAvatar from '../../../hooks/useUpdateAvatar';
import { FaEdit } from 'react-icons/fa';
import Spinner from '../../common/LoadingSpinner';
import ImageDisplay from '../../common/ImageDisplay';
import { useErrorHandling } from '../../../hooks/useErrorHandling';
import { getErrorMessage } from '../../../utils/utils';

function ProfileForm() {
    const { user, setUser, error: fetchError } = useFetchProfile();
    const [showAvatarUpdate, setShowAvatarUpdate] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useFormLogic(updateProfileSchema);
    const updateAvatar = useUpdateAvatar(setUser);
    const { getCombinedErrorMessage } = useErrorHandling();

    const errorMessage = getCombinedErrorMessage(fetchError)
    const { showError } = useErrorHandling();

    const onSubmit = async (data, event) => {
        event.preventDefault();
        if (data.avatar) {
            try {
                await updateAvatar(data.avatar);
                setShowSuccessMessage(true);
            } catch (error) {
                showError(getErrorMessage(error));
            }
        } else {
            showError('Avatar URL is required for updating the avatar.');
        }
    };

    useEffect(() => {
        let timeout;
        if (showSuccessMessage) {
            timeout = setTimeout(() => setShowSuccessMessage(false), 2000);
        }
        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [showSuccessMessage]); 

    if (!user) {
        return <Spinner />;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="text-center">
                <ImageDisplay media={[user.avatar]} displayType="avatar" className="rounded-full h-20 w-20 mx-auto mb-4" />
                {!showAvatarUpdate ? (
                    <button
                        className="inline-flex items-center justify-center text-blue-500 underline mb-4"
                        onClick={() => setShowAvatarUpdate(true)}
                    >
                        Change Avatar<FaEdit className='ml-2'/>
                    </button>
                ) : (
                    <FormLayout onSubmit={handleSubmit(onSubmit)}>
                        {errorMessage && <div className="bg-red-200 text-red-800">{errorMessage}</div>}
                        <Input
                            register={register}
                            name="avatar"
                            label="Update Avatar URL"
                            placeholder="https://example.com/avatar.jpg"
                            error={errors.avatar?.message}
                        />
                        <div className="flex justify-center space-x-4 mt-4">
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 font-semibold py-2 px-8 rounded-full">
                                Update
                            </button>
                            <button
                                type="button"
                                className="bg-white hover:bg-gray-100 text-blue-700 border border-blue-700 font-semibold py-2 px-7 rounded-full"
                                onClick={() => setShowAvatarUpdate(false)}
                            >
                                Close
                            </button>
                        </div>
                    </FormLayout>
                )}
            </div>
            {showSuccessMessage && (
                <div className="text-center font-semibold mt-4 p-3 bg-green-200 text-green-800 rounded">
                    Avatar updated successfully!
                </div>
            )}
            <div className="mt-12 flex justify-center w-full">
                <div>
                    <p className="mb-5">
                        <span className="font-bold text-lg">Name: </span>{user.name}
                    </p>
                    <p className="mb-5">
                        <span className="font-bold text-lg">Email: </span>{user.email}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProfileForm;
