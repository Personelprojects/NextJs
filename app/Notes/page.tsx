'use client';
import Link from "next/link";
import 'C:/Users/arunt/Documents/Projects/tailwindcss/AI/first/app/globals.css';
import { useState, useRef, useLayoutEffect, ChangeEvent } from "react";



export default function Page(){
    const [value, setValue] = useState('');
    const [submitting,setSubmitting] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    useLayoutEffect(() => {
        if(textareaRef.current){
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    },[value]);

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!value.trim()) return;
        setSubmitting(true);

        try{
            const response = await fetch('api/notes',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content:value }),
            });
            if(response.ok){
                setValue('');
            }
            else{

            }

        }
        catch(err){

        }
        finally{
            setSubmitting(false);
        }
    };


    return (
        <div>
            <form className="note-container" onSubmit={ handleSubmit }>
                <div>
                    <Link href="./" className="home-link">Home</Link>
                </div>
                <div className="heading-container">
                    <h2>Enter your Notes here:</h2>
                </div>
                
                <div className="text_area_outside_container">
                    <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    className="text_area_container"
                    placeholder="Start Typing"
                    >
                    
                    </textarea>
                </div>
                <div className="submit-container">
                    <button type= "submit" className="note-submit" disabled={submitting}>
                        Submit Notes
                    </button>
                </div>
            </form>
        </div>
    );
}