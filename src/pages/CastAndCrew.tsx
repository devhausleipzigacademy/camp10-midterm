import CastCrew from '../components/CastCrew';
import { Cast, Credits, Crew } from '../types/api';
import { Tab } from '@headlessui/react';
import { Button } from '../components/Button';
import { Fragment } from 'react';
import { useLoaderData } from 'react-router-dom';
import Header from '../components/Header';

const tabs = ['Cast', 'Crew'];

export function CastAndCrew() {
  const credits = useLoaderData() as Credits;

  const groupedCrew = credits.crew.reduce((acc, person) => {
    const existingPerson = acc.find(p => p.id === person.id);
    if (existingPerson) {
      existingPerson.jobs.push(person.job);
    } else {
      acc.push({ ...person, jobs: [person.job] });
    }
    return acc;
  }, [] as (Crew & { jobs: string[] })[]);

  return (
    <div className="h-full w-full px-5 py-8 flex flex-col">
      <Header title={'Cast & Crew'} />
      <Tab.Group>
        <Tab.List className="flex justify-between mt-8 mb-6">
          {tabs.map((tab, index) => (
            <Tab key={index} as={Fragment}>
              {({ selected }) => (
                <Button
                  variant="secondary"
                  size="tiny"
                  className={`${
                    selected
                      ? 'ring-1 ring-white bg-white-dimmed'
                      : 'text-white-dimmed'
                  }`}
                >
                  {tab}
                </Button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="overflow-y-scroll  container-snap">
          <Tab.Panel className="space-y-4">
            {credits.cast.map((person: Cast, index) => (
              <CastCrew person={person} key={index} />
            ))}
          </Tab.Panel>
          <Tab.Panel className="space-y-4">
            {groupedCrew.map((person, index) => (
              <CastCrew key={index} person={person} />
            ))}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
