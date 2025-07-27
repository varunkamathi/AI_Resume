import { resumes } from "~/constant";
import Nav from "../components/Nav";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import { usePuterStore } from "~/lib/Puter";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resuming" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() { 
  const { auth } = usePuterStore();
  const navigate = useNavigate();
 

useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Nav/>
    <section className="main-section">
      <div className="page-heading">
        <h1>Track Your Application & Resume Rating</h1>
        <h2>Review your submissions and check AI-powered feedback</h2>
      </div>
      {resumes.length > 0 && (
    <div className="flex flex-wrap max-lg:flex-col gap-6 items-start  w-full max-w-[1850px] justify-evenly">
       {resumes.map((resume) => (
    <>
    <ResumeCard key={resume.id} resume={resume} />
    </>
  ))} 
    </div>
  )}
        </section>


      
  </main>;
}
