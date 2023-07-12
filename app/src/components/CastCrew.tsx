import { Cast, Crew } from '../types/api.ts';

type CastCrewProps = { person: Cast | Crew };

export default function CastCrew({ person }: CastCrewProps) {
  const isActor = (person: Cast | Crew): person is Cast =>
    'character' in person;
  const { name: personName, profile_path: image } = person;
  const role = isActor(person) ? person.character : person.job;
  const imageUrl = image
    ? `https://image.tmdb.org/t/p/w500${image}`
    : 'https://images.unsplash.com/photo-1607317146126-64b09b69eb4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80';
  return (
    <div className="flex flex-row gap-5">
      <div className="h-16 w-16 bg-dark-light">
        <img
          src={imageUrl}
          alt={personName}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className=" text-white font-700 text-m">{personName}</h2>
        <h4 className="text-s text-white-dimmed">{role}</h4>
      </div>
    </div>
  );
}
