import CastCrew from '../components/CastCrew';
import { Cast, Credits, Crew } from '../types/api';

const castAndCrew: Credits = {
  id: 1003579,
  cast: [
    {
      id: 206757,
      known_for_department: 'Acting',
      name: 'David Giuntoli',
      profile_path: '/xxtB8TfKLMw9Utx5v2b3Z0nu5VL.jpg',
      character: 'Batman / Bruce Wayne (voice)',
    },
    {
      id: 58791,
      known_for_department: 'Acting',
      name: 'Patrick Fabian',
      profile_path: '/ziTKeEraEksMQBg02adD22JJXb0.jpg',
      character: 'Harvey Dent / Two-Face (voice)',
    },
  ],
  crew: [
    {
      id: 10949,
      known_for_department: 'Production',
      name: 'Michael Uslan',
      profile_path: '/cXiiH0SSk5UHCvHOVAhHX7tNuls.jpg',
      job: 'Executive Producer',
    },
    {
      id: 66266,
      known_for_department: 'Writing',
      name: 'Mike Mignola',
      profile_path: '/cCYHC9bpVv8tfEzQ2dqlEEGOjX0.jpg',
      job: 'Comic Book',
    },
  ],
};

export function CastAndCrew() {
  return (
    <div className="flex flex-col gap-4">
      {castAndCrew.cast.map((person: Cast) => (
        <CastCrew person={person} key={person.id} />
      ))}
      {castAndCrew.crew.map((person: Crew) => (
        <CastCrew key={person.id} person={person} />
      ))}
    </div>
  );
}
