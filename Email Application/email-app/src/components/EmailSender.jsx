import React from 'react'

function EmailSender(){
    return (
    <div className='w-full min-h-screen flex justify-center items-center'> 
        <div className='email_card w-1/3 -mt-10 bg-white rounded-lg p-4 rounded border shadow'>
            <h1 className='text-gray-900 text-3xl'>Email Sender</h1>
            <p className=' text-gray-700'>Send email to your favorite person with your phone app ...</p>
            <form action="">
                <div className='input_field mt-4'>
                     <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To </label>
                    <input type="text" id="large-input"placeholder='Enter Here' class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "/>
                </div>
                        {   /*Subject */}
                <div className='input_field mt-4'>
                     <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject </label>
                    <input type="text" id="large-input"placeholder='Enter Here' class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "/>
                </div>
                {/* Message Box */}
                <div className='form_field mt-4'>
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                    <textarea id="message" rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                </div>
                <div className="button_container mt-4 flex justify-center gap-2 ">
                    <button className='hover:bg-blue-900 text-white bg-blue-700 px-3 py-2 rounded'>Send Email</button>
                    <button className='hover:bg-gray-900 text-white bg-gray-700 px-3 py-2 rounded'>Clear</button>
                </div>
            </form>
        </div>
    </div>
    );
}

export default EmailSender