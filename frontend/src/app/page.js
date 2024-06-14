'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

export default function Home() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/Alxdelira');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {userData && (
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center space-y-2">
            <img src={userData.avatar_url} alt="Avatar" width={200} height={200} className="rounded-full" />
            <p className="text-lg">Seguidores: {userData.followers}</p>
            <p className="text-lg">Repositórios públicos: {userData.public_repos}</p>
            <p className="text-lg">Portifolio: <Link href={userData.blog} target="_blank"   className="underline">Click Aqui !</Link></p>
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4">Olá, eu sou Alexandre Nogueira de Lira</h1>
      <p className="text-lg mb-6">
        Estou muito agradecido pela oportunidade de mostrar meus talentos. Você pode me encontrar no LinkedIn e no GitHub:
      </p>
      <div className="flex flex-row items-center space-x-4 mb-6">
        <Linkedin />
        <Link href="https://www.linkedin.com/in/alxdelira/" target="_blank" className="underline">LinkedIn</Link>
        <Github />
        <Link href="https://github.com/Alxdelira" target="_blank"  className="underline">Github</Link>
      </div>
      <img src="/assets/footer.jpeg" alt="Logo" className="mt-8 " />
    </div>
  );
}
