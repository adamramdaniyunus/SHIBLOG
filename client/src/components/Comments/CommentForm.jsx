import React, { useState } from 'react'

const CommentForm = ({
    formSubmitHanlder,
    formCancelHanlder = null,
    btnLabel,
    initialText = "",
    loading = false, }) => {
    const [value, setValue] = useState(initialText)
    const submitHandler = e => {
        e.preventDefault()
        formSubmitHanlder(value)
        setValue("")
    }
    return (
        <form onSubmit={submitHandler}>
            <div className='flex flex-col items-end border border-primary rounded-lg p-4'>
                <textarea
                    rows={"5"}
                    className='w-full focus:outline-none bg-transparent'
                    placeholder='Berikan Komentar...'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                ></textarea>
                <div className='flex items-center gap-x-2 pt-2'>
                    {formCancelHanlder && (
                        <button onClick={formCancelHanlder}
                            type='button'
                            className='px-6 py-2.5 rounded-lg border-red-500 text-red-500 font-semibold mt-2'
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type='submit'
                        disabled={loading}
                        className='px-6 py-2.5 rounded-lg bg-primary
                 text-white font-semibold mt-2 disabled:opacity-70 disabled:cursor-not-allowed'
                    >
                        {btnLabel}
                    </button>

                </div>
            </div>
        </form>
    )
}

export default CommentForm
