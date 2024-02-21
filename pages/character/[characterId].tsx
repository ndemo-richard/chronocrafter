import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

interface Character {
  name: string;
  image: string;
  status: string;
  url: string;
}

const CharacterDetailPage = () => {
  const router = useRouter();
  const { characterId } = router.query;
  const [character, setCharacter] = useState<Character | null>(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!characterId) return;
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`);
        setCharacter(response.data);
      } catch (error) {
        console.error('Failed to fetch character details:', error);
      }
    };

    fetchCharacter();
  }, [characterId]);

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would implement the logic to save the note persistently
    console.log('Saving note:', notes);
    // Reset note input after saving
    setNotes('');
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Character Details</title>
      </Head>
      {character && (
        <>
          <h1 className="text-2xl font-bold mb-4">{character.name}</h1>
          <img src={character.image} alt={character.name} className="mb-4" />
          <p>Status: {character.status}</p>
          <form onSubmit={handleSubmit} className="mt-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Add notes about this character..."
              value={notes}
              onChange={handleNoteChange}
            ></textarea>
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Save Note</button>
          </form>
          <Link href="/">
            <div className="mt-4 inline-block bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Back to Home</div>
          </Link>
        </>
      )}
    </div>
  );
};

export default CharacterDetailPage;
