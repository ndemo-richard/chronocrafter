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
  const [saved, setSaved] = useState(false); // State to track whether the note has been saved

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
    // Implement the logic to save the note persistently
    console.log('Saving note:', notes);
    // Reset note input after saving
    setNotes('');
    // Set saved state to true to show the popup
    setSaved(true);
    // Reset saved state after 3 seconds
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto p-4 text-white relative">
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
              className="w-full p-2 border border-gray-300 rounded-lg text-black"
              placeholder="Add notes about this character..."
              value={notes}
              onChange={handleNoteChange}
            ></textarea>
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Save Note</button>
          </form>
          {saved && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
              <div className="bg-green-500 text-white px-4 py-2 rounded-lg">
                Note saved!
              </div>
            </div>
          )}
          <Link href="/">
            <div className="mt-4 inline-block bg-amber-950 px-4 py-2 rounded hover:bg-gray-950">Back to Home</div>
          </Link>
        </>
      )}
    </div>
  );
};

export default CharacterDetailPage;
