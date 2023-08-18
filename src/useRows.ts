import {useState, useCallback, useRef, useEffect, useMemo} from 'react';

import {FormApi} from 'final-form';

export interface UseRowsProps<RowType> {
    generateRow: (_?: any) => RowType;
    form: FormApi;
    initialRows?: RowType[];
}
export interface UseRowsInstance<RowType, RowFields extends {} = {}> {
    rows: RowType[];
    getRows: () => RowType[];
    getRowIndex: (row: RowType) => number;
    update: (rows: RowType[]) => void;
    push: (row: RowType, values?: RowFields) => void;
    remove: (row: RowType) => void;
    unshift: (row?: RowType, values?: RowFields) => void;
    copy: (row: RowType, newRow?: RowType, position?: number) => void;
    drag: (dragRow: RowType, hoverRow: RowType) => void;
    generate: (_?: any) => RowType;
    getDirty: () => boolean;

    // TODO: implement methods like in https://final-form.org/docs/final-form-arrays/api
    concat: () => void;
    insert: () => void;
    move: () => void;
    pop: () => void;
    removeBatch: () => void;
    shift: () => void;
    swap: () => void;
}

// TODO: useRows must return an existing instance of rows
export function useRows<RowType extends string = string, RowFields extends {} = {}>({
    generateRow,
    form,
    initialRows,
}: UseRowsProps<RowType>): UseRowsInstance<RowType, RowFields> {
    const {change, getState} = form;
    const [rows, setRows] = useState(initialRows ?? (Object.keys(getState().values) as RowType[]));
    const rowsRef = useRef(rows);
    const dirtyRef = useRef(false);
    const generate = useMemo(() => generateRow, [generateRow]);

    useEffect(() => {
        setRows(initialRows ? initialRows : []);
    }, [initialRows]);

    // store rows without updates
    useEffect(() => {
        dirtyRef.current = rows !== initialRows;
        rowsRef.current = rows;
    }, [initialRows, rows]);

    // TODO: will be implemented
    const concat = useCallback(() => {}, []);

    // TODO: will be implemented
    const insert = useCallback(() => {}, []);

    // TODO: will be implemented
    const move = useCallback(() => {}, []);

    // TODO: will be implemented
    const pop = useCallback(() => {}, []);

    const push = useCallback(() => {
        const newRow = generate();
        setRows((currentRows) => [...currentRows, newRow]);
    }, [generate]);

    const remove = useCallback(
        (deletingRow) => {
            setRows((currentRows) => currentRows.filter((item) => item !== deletingRow));
            change(deletingRow, null);
        },
        [change],
    );

    // TODO: will be implemented
    const removeBatch = useCallback(() => {}, []);

    // TODO: will be implemented
    const shift = useCallback(() => {}, []);

    // TODO: will be implemented
    const swap = useCallback(() => {}, []);

    const unshift = useCallback(
        (newRow = generate(), values) => {
            setRows((currentRows) => [newRow, ...currentRows]);
            if (values) {
                change(newRow, values);
            }
        },
        [generate, change],
    );

    const update = useCallback((newRows: RowType[]) => {
        setRows(newRows);
    }, []);

    const copy = useCallback(
        (row, newRow = generate(), position = 0) => {
            // TODO: @makhnatkin check insert position logic
            setRows((currentRows) => {
                const copiedIndex = position || currentRows.findIndex((item) => item === row);
                const updatedRows = [...currentRows];
                updatedRows.splice(copiedIndex, 0, newRow);
                return updatedRows;
            });
            change(newRow, getState().values[row]);
        },
        [change, generate, getState],
    );

    const drag = useCallback((dragRow, hoverRow) => {
        setRows((currentRows) => {
            const updatedRows = [...currentRows];
            const dragIndex = updatedRows.findIndex((row) => row === dragRow);
            const hoverIndex = updatedRows.findIndex((row) => row === hoverRow);

            if (dragIndex !== -1 && hoverIndex !== -1) {
                [updatedRows[dragIndex], updatedRows[hoverIndex]] = [
                    updatedRows[hoverIndex],
                    updatedRows[dragIndex],
                ];
            }

            return updatedRows;
        });
    }, []);

    const getRows = useCallback(() => {
        return rowsRef.current;
    }, []);

    const getDirty = useCallback(() => {
        return dirtyRef.current;
    }, []);

    const getRowIndex = useCallback((row) => rowsRef.current.findIndex((item) => item === row), []);

    return {
        rows,
        getRows,
        getRowIndex,
        update,
        push,
        remove,
        unshift,
        copy,
        drag,
        concat,
        insert,
        move,
        pop,
        removeBatch,
        shift,
        swap,
        generate,
        getDirty,
    };
}
