import nameList from '../assets/names.txt?raw';

export function getNameList(): Set<string> {
  const names = nameList.split('\n').map(name => name.trim().toLowerCase()).filter(name => name.length > 0);
  return new Set(names);
}