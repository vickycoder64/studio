"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, X, Divide } from 'lucide-react';

export default function Calculator() {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(true);

  const calculate = (prev: string, curr: string, op: string): string => {
    const prevNum = parseFloat(prev);
    const currNum = parseFloat(curr);
    if (isNaN(prevNum) || isNaN(currNum)) return 'Error';

    let result: number;
    switch (op) {
      case '+':
        result = prevNum + currNum;
        break;
      case '-':
        result = prevNum - currNum;
        break;
      case '*':
        result = prevNum * currNum;
        break;
      case '/':
        if (currNum === 0) return 'Error';
        result = prevNum / currNum;
        break;
      default:
        return 'Error';
    }
    return String(parseFloat(result.toPrecision(15)));
  };

  const addDigit = (digit: string) => {
    if (currentValue === 'Error') {
      clear();
      return;
    }
    if (digit === '.' && currentValue.includes('.')) return;
    if (currentValue.length > 15 && !overwrite) return;

    if (overwrite) {
      setCurrentValue(digit);
      setOverwrite(false);
    } else {
      setCurrentValue(currentValue === '0' && digit !== '.' ? digit : `${currentValue}${digit}`);
    }
  };

  const selectOperation = (op: string) => {
    if (currentValue === 'Error') {
      clear();
      return;
    }
    if (previousValue && operation && !overwrite) {
      const result = calculate(previousValue, currentValue, operation);
       if (result === 'Error') {
        setCurrentValue(result);
        setPreviousValue(null);
        setOperation(null);
        setOverwrite(true);
        return;
      }
      setCurrentValue(result);
      setPreviousValue(result);
    } else {
      setPreviousValue(currentValue);
    }
    setOperation(op);
    setOverwrite(true);
  };

  const equals = () => {
    if (!operation || !previousValue || overwrite) return;
    if (currentValue === 'Error') {
      clear();
      return;
    }

    const result = calculate(previousValue, currentValue, operation);
    setCurrentValue(result);
    setPreviousValue(null);
    setOperation(null);
    setOverwrite(true);
  };

  const clear = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperation(null);
    setOverwrite(true);
  };

  const getDisplayClass = () => {
    if (currentValue === 'Error') return 'text-5xl';
    const len = currentValue.length;
    if (len > 16) return 'text-2xl';
    if (len > 12) return 'text-3xl';
    if (len > 9) return 'text-4xl';
    return 'text-6xl';
  };

  return (
    <Card className="w-full max-w-xs sm:max-w-sm mx-auto bg-card shadow-2xl rounded-2xl border-2 border-primary/20">
      <CardContent className="p-4">
        <div className="bg-muted text-right rounded-lg p-4 mb-4 min-h-[120px] flex flex-col justify-end">
          <div className="text-muted-foreground text-xl h-7 truncate">
            {previousValue && operation ? `${previousValue} ${operation}` : ''}
          </div>
          <div className={`font-headline text-primary break-all ${getDisplayClass()}`}>
            {currentValue}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Button onClick={clear} variant="secondary" className="text-2xl h-16 sm:h-20 col-span-2">C</Button>
          <Button onClick={() => selectOperation('/')} className="text-2xl h-16 sm:h-20"><Divide size={28} /></Button>
          <Button onClick={() => selectOperation('*')} className="text-2xl h-16 sm:h-20"><X size={28} /></Button>

          <Button onClick={() => addDigit('7')} variant="secondary" className="text-3xl h-16 sm:h-20">7</Button>
          <Button onClick={() => addDigit('8')} variant="secondary" className="text-3xl h-16 sm:h-20">8</Button>
          <Button onClick={() => addDigit('9')} variant="secondary" className="text-3xl h-16 sm:h-20">9</Button>
          <Button onClick={() => selectOperation('-')} className="text-2xl h-16 sm:h-20"><Minus size={28} /></Button>
          
          <Button onClick={() => addDigit('4')} variant="secondary" className="text-3xl h-16 sm:h-20">4</Button>
          <Button onClick={() => addDigit('5')} variant="secondary" className="text-3xl h-16 sm:h-20">5</Button>
          <Button onClick={() => addDigit('6')} variant="secondary" className="text-3xl h-16 sm:h-20">6</Button>
          <Button onClick={() => selectOperation('+')} className="text-2xl h-16 sm:h-20"><Plus size={28} /></Button>

          <Button onClick={() => addDigit('1')} variant="secondary" className="text-3xl h-16 sm:h-20">1</Button>
          <Button onClick={() => addDigit('2')} variant="secondary" className="text-3xl h-16 sm:h-20">2</Button>
          <Button onClick={() => addDigit('3')} variant="secondary" className="text-3xl h-16 sm:h-20">3</Button>
          <Button onClick={equals} className="text-3xl h-16 sm:h-20 row-span-2 sm:h-auto">=</Button>

          <Button onClick={() => addDigit('0')} variant="secondary" className="text-3xl h-16 sm:h-20 col-span-2">0</Button>
          <Button onClick={() => addDigit('.')} variant="secondary" className="text-3xl h-16 sm:h-20">.</Button>
        </div>
      </CardContent>
    </Card>
  );
}
