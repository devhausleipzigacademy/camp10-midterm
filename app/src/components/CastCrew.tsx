import { Cast, Crew } from '../types/api';

type CastCrewProps = { person: Cast | (Crew & { jobs: string[] }) };

export default function CastCrew({ person }: CastCrewProps) {
  const isActor = (
    person: Cast | (Crew & { jobs: string[] })
  ): person is Cast => 'character' in person;
  const { name: personName, profile_path: image } = person;
  const roles = isActor(person) ? [person.character] : person.jobs;
  const imageUrl = image
    ? `https://image.tmdb.org/t/p/w500${image}`
    : 'https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-9-1022x1024.jpg';
  return (
    <div className="flex flex-row gap-5">
      <div className="h-16 w-16 bg-dark-light flex ju">
        <img
          src={imageUrl}
          alt={personName}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className=" text-white font-700 text-m">{personName}</h2>
        <h4 className="text-s text-white-dimmed">{roles.join(', ')}</h4>
      </div>
    </div>
  );
}
