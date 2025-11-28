
    export type RemoteKeys = 'mf_remote/counter' | 'mf_remote/button';
    type PackageType<T> = T extends 'mf_remote/button' ? typeof import('mf_remote/button') :T extends 'mf_remote/counter' ? typeof import('mf_remote/counter') :any;